from main import app

"""
Testing routes
"""
@app.route('/commits/users', methods=['GET', 'POST'])
def commits_users():
    return {
    "user_commits": {
        "1": [10, 23, 34],
        "22": [0, 12, 12]
    },
    "user_info": {
        "1": "Alan",
        "22": "Betty"
    }
}

@app.route('/commits/repos', methods=['GET', 'POST'])
def commits_repos():
    return {
    "repo_commits": {
        "1": [10, 23, 34, 45],
        "22": [0, 12, 12, 67]
    },
    "repo_info": {
        "1": "dabnet",
        "22": "chess"
    }
}

@app.route('/commits/commit-tags/', methods=['GET', 'POST'])
def commit_tags():
    return {
    "logs": [
        ["jeff", "n_queens", "Initial Commit"],
        ["abi", "Floyd's Cycle", "Project Completed"]
    ]
}




if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)