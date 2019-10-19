from flask import Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db/'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

from flask_cors import CORS
CORS(app)

from main import routes