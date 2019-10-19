from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'dev'

from flask_sqlalchemy import SQLAlchemy
#'sqlite:///site.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@db/'
db = SQLAlchemy(app)

from main import routes