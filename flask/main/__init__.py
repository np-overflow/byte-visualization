from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'dev'

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db/'#'sqlite:///site.db'
db = SQLAlchemy(app)

from main import routes