import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .api.v1 import version_one as v1
import cloudinary

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.register_blueprint(v1)
    app.secret_key ="371a7a78d634dd71ce5f215d4827ea919d00ea50a9e20482d7adefd8a5156b78"
    app.config['CORS_HEADERS'] = 'Content-Type'
    cloudinary.config(cloud_name='doammcpie',
                  api_key='312732988453856',
                  api_secret='lZAWnOC1uWeK_zvV4jehJRM_7BQ')

    JWTManager(app)
    jwt = JWTManager(app)
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False


    return app
