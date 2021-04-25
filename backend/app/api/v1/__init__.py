from .view.view import *

from flask_restful import Api, Resource
from flask import Blueprint


version_one = Blueprint('api_v1', __name__, url_prefix='/rafiki')
api = Api(version_one)
api.add_resource(Index, "/")
api.add_resource(Stories,"/stories")
api.add_resource(Share, "/share")
