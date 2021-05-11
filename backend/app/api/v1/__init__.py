from .view.view import *

from flask_restful import Api, Resource
from flask import Blueprint


version_one = Blueprint('api_v1', __name__, url_prefix='/rafiki')
api = Api(version_one)
api.add_resource(Index, "/")
api.add_resource(TokenApi,"/api")
api.add_resource(AddUser, "/signup")
api.add_resource(Post, "/post")
api.add_resource(Auth, "/auth")
api.add_resource(Rooms, "/rooms")
api.add_resource(Comment, "/comment")
api.add_resource(Comments, "/comments/<int:post_id>")
api.add_resource(Room, "/room/<int:room_id>")
