#pylint: skip-file

from main import db

class Repo(db.Model):
    repo_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    reponame = db.Column(db.String(100), nullable=False)
    commits = db.relationship('Commit', backref='repo')

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    commits = db.relationship('Commit', backref='user')

class Commit(db.Model):
    commit_id = db.Column(db.Integer, primary_key=True)
    repo_id = db.Column(db.Integer, db.ForeignKey('repo.repo_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    message = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
