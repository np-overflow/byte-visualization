###  Command Line  ###
import argparse

parser = argparse.ArgumentParser(description="Initialise Repositories / Database")
parser.add_argument('-r', '--repos', action='store_true', help='initialise repositories')
parser.add_argument('-d', '--db', action='store_true', help='initialise database')
args = parser.parse_args()


###  Initialisation  ###
from config import REPOS

# Repositories
def init_repos():
    import subprocess, os
    from main import app
    repos_folder = os.path.join(app.root_path, 'repos')

    subprocess.run(['rm', '-rf', repos_folder])
    subprocess.run(['mkdir', repos_folder])
    for repo_link, repos in REPOS:
        for user, repo in repos:
            url = repo_link(user, repo)
            subprocess.run(['git', 'clone', url, f'{user}-{repo}'], cwd=repos_folder)

# Database
def init_db():
    from main import db
    from main.models import Repo
    
    db.drop_all()
    db.create_all()
    for _, repos in REPOS:
        for user, repo in repos:
            repo = Repo(username=user, reponame=repo)
            db.session.add(repo)
    db.session.commit()


###  Execution  ###
if __name__ == '__main__':
    if args.repos:  init_repos()
    if args.db:     init_db()