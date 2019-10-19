from flask import Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'

from flask_sqlalchemy import SQLAlchemy
<<<<<<< HEAD
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db/'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
=======
#'sqlite:///site.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@db/'
>>>>>>> ceec57fe88d95436f7831e752f85fd1a831dec4a
db = SQLAlchemy(app)

from flask_cors import CORS
CORS(app)

from main import routes