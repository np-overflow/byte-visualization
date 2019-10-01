from flask import Flask

import os
print(os.getcwd())

# app = Flask(__name__)
# This is to set the file to automatically find the files react built
app = Flask(__name__, static_folder="./build/static", template_folder="./build")
app.config['SECRET_KEY'] = 'dev'

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

from main import routes
