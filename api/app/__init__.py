'''docs'''

import os
from flask import Flask,request
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import configurations


db = SQLAlchemy()
migrate = Migrate()
cors = CORS()

def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app,db)
    cors.init_app(app)
    

def register_blueprints(app):
    from .view.story import posts 
    app.register_blueprint(posts, url_prefix='/api')

    from .view.users import users
    app.register_blueprint(users, url_prefix='/api')

    from .view.space import space
    app.register_blueprint(space, url_prefix='/api')
    


def create_app(configuration):
    app = Flask(__name__)
    app.config.from_object(configurations[configuration])

    from app.model import data_model
    
    register_extensions(app)
    register_blueprints(app)


    return app




