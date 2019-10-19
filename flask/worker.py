###  Imports  ###
# Directories
from main import app, db
from main.models import Repo, User, Commit
# Ultities
import subprocess, os
from datetime import datetime, timedelta
import atexit, time

###  Helper Functions  ###
def parse_shortlog(stdout):
    usernames = []
    details = []
    for x in stdout.split('\n\n')[:-1]:
        y = x.split('\n')
        user_tag = y[0]
        username = user_tag[:user_tag.rindex(' (')]
        detail = [z.strip().strip('"') for z in y[1:]]
        usernames.append(username)
        details.append(detail)
    return usernames, details

###  A unit of work  ###
def work(repo):
    repo_folder = os.path.join(app.root_path, 'repos', f'{repo.username}-{repo.reponame}')

    latest_commit = (Commit.query.filter_by(repo_id=repo.repo_id)
                                 .order_by(Commit.date.desc())
                                 .first())
    if latest_commit:
        latest_date = (latest_commit.date + timedelta(seconds=1)).strftime('%a %b %d %H:%M:%S %Y %z')
    else: 
        latest_date = "2000"

    # Update
    subprocess.run(
        ['git', 'pull'],
        cwd=repo_folder, stdout=subprocess.DEVNULL
    )

    # Get Commits
    p_msg = subprocess.run(
        ['git', 'shortlog', f'--since="{latest_date}"', '--format="%s"'],
        cwd=repo_folder, capture_output=True, text=True
    )

    p_date = subprocess.run(
        ['git', 'shortlog', f'--since="{latest_date}"', '--format="%ad"'],
        cwd=repo_folder, capture_output=True, text=True
    )

    print('runs up till here')
    if p_msg.returncode == p_date.returncode == 0:
        print('does not run past here')
        for (username, messages, _username, dates) in zip(
            *parse_shortlog(p_msg.stdout), *parse_shortlog(p_date.stdout)):
            if username != _username: raise Exception('Username is different')
            if len(messages) != len(dates): raise Exception('Lengths are different')

            user = User.query.filter_by(username=username).first()
            if not user:
                user = User(username=username)
                db.session.add(user)
                db.session.commit()

            for message, date in zip(messages, dates):
                commit = Commit(
                    repo_id = repo.repo_id,
                    user_id = user.user_id,
                    message=message,
                    date=datetime.strptime(date, '%a %b %d %H:%M:%S %Y %z')
                )
                db.session.add(commit)
    
    # Other Services...
    #....
    
    # Commit to DB
    db.session.commit()


###  Execution  ###
flag = False

@atexit.register
def kill_worker():
    print('Killing worker...')
    flag = True
    while flag:
        print('Waiting for worker...')
        time.sleep(1)

if __name__ == '__main__':
    repos = Repo.query.all()
    while not flag:
        for repo in repos:
            work(repo)
            if flag: break  
    flag = False