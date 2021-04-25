import os
from flask import Flask
from flask_cors import CORS
from .api.v1 import version_one as v1

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.register_blueprint(v1)
    app.secret_key ="371a7a78d634dd71ce5f215d4827ea919d00ea50a9e20482d7adefd8a5156b78"

    return app
