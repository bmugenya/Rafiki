import os, re , datetime
from json import dumps, loads
from flask import Blueprint
from flask_restful import Resource
from flask import (
    jsonify,make_response,request,render_template,Response,
    current_app,flash,redirect,url_for,json,current_app, Blueprint,Markup
)
from ..model.model import Model

api = Blueprint('api', __name__)


# INDEX VIEW

class Index(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self):
        return '<h1>Index Page</h1>'


class Share(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self):
        return '<h1>Share Page</h1>'


class Stories(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self):
        return '<h1>Stories Page</h1>'
