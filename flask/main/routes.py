from main import app, db
from main.models import Repo, User, Commit
from flask import render_template, request, jsonify
from sqlalchemy import func
from datetime import datetime, timedelta

# Set to False in production
testing = True

# @app.route('/')
# def index():
#     print('Hello World')

@app.route('/commits/users', methods=['GET', 'POST'])
def users_commits():
    print(request.json)
    if not testing:
        data = request.json
        users_commits = users_commits_intervals(
            start_date=data['start_date'],
            end_date=data['end_date'],
            intervals=data['intervals']
        )
        users_info = {user.user_id: user.username for user in User.query.all()}
        return jsonify({
            'user_commits': users_commits,
            'user_info': users_info
        })
    data = request.json
    if data['intervals'] == 1:
        return {
        "user_commits": {
            "1": [10],
            "22": [3]
        },
        "user_info": {
            "1": "Alan",
            "22": "Betty"
        }, "time_intervals": ["2019-11-05 23:13:10"]}
    return {
    "user_commits": {
        "1": [10, 23, 34],
        "22": [0, 12, 12]
    },
    "user_info": {
        "1": "Alan",
        "22": "Betty"
    },
    "time_intervals": ["2019-11-05 23:13:10", "2019-11-05 23:13:15", "2019-11-05 23:13:20"]}


@app.route('/commits/repos', methods=['GET', 'POST'])
def repos_commits():
    print(request.json)
    if not testing:
        data = request.json
        repos_commits = repos_commits_intervals(
            start_date=data['start_date'],
            end_date=data['end_date'],
            intervals=data['intervals']
        )
        repos_info = {repo.repo_id: repo.reponame for repo in Repo.query.all()}
        return jsonify({
            'repos_commits': repos_commits,
            'repos_info': repos_info
        })
    data = request.json
    if data['intervals'] == 1:
        return {
        "repo_commits": {
            "1": [8],
            "22": [15]
        },
        "repo_info": {
            "1": "dabnet",
            "22": "chess"
        },
        "time_intervals": ["2019-10-05 23:13:10"]
        }
    return {
    "repo_commits": {
        "1": [10, 23, 34],
        "22": [0, 12, 12]
    },
    "repo_info": {
        "1": "dabnet",
        "22": "chess"
    },
    "time_intervals": ["2019-10-05 23:13:10", "2019-10-05 23:13:15", "2019-10-05 23:13:20"]
    }
    


@app.route('/commit-tags/<int:limit>', methods=['GET', 'POST'])
def commit_tags(limit):
    print(request.json)
    if not testing:
        logs = recent_commits(limit)
        return jsonify({
            'logs': logs
        })
    return {
    "logs": [
        ["jeff", "n_queens", "Initial Commit"],
        ["abi", "Floyd's Cycle", "Project Completed"]
    ]}

def recent_commits(limit):
    logs = []
    for commit in Commit.query.order_by(Commit.date.desc()).limit(limit).all():
        user = User.query.get(commit.user_id)
        repo = Repo.query.get(commit.repo_id)
        logs.append((user.username, repo.reponame, commit.message))
    return logs

def users_commits_intervals(start_date=None, end_date=None, intervals=1):
    return _commits_intervals(Commit.user_id, start_date, end_date, intervals)

def repos_commits_intervals(start_date=None, end_date=None, intervals=1):
    return _commits_intervals(Commit.repo_id, start_date, end_date, intervals)

def _commits_intervals(_table_column, start_date, end_date, intervals):
    ### For Arguments Initialisation
    # Start Date
    if start_date is None:
        earliest_commit = Commit.query.order_by(Commit.date).first()
        if not earliest_commit: return {}
        start_date = earliest_commit.date - timedelta(seconds=1)
    # End Date
    if end_date is None:
        end_date = datetime.now()
    # Delta
    delta = (end_date - start_date) / intervals

    ### Get no. commits, all users, all interval
    _commits_intervals = {}
    interval_start = start_date
    interval_end = interval_start + delta
    for i in range(intervals):
        # Get no. commits, all users, each interval
        _commits = Commit.query.filter(Commit.date > interval_start).filter(Commit.date <= interval_end).with_entities(_table_column, func.count(_table_column)).group_by(_table_column).all()
        for _id, n_commits in _commits:
            # Get no. commits, each users, each interval
            if _id in _commits_intervals:
                _commits_intervals[_id].extend([0] * (i - len(_commits_intervals[_id])))
            else:
                _commits_intervals[_id] = [0] * i
            _commits_intervals[_id].append(n_commits)

        interval_start = interval_end
        interval_end += delta

    for a_commits_intervals in _commits_intervals.values():
        a_commits_intervals.extend([0] * (intervals - len(a_commits_intervals)))

    return _commits_intervals