import os, re , datetime
from json import dumps, loads
from flask import Blueprint
from flask_restful import Resource
from flask import (
    jsonify,make_response,request,
  Blueprint
)
from ..model.model import Model
from flask_jwt_extended import (
     jwt_required, create_access_token,
    get_jwt_identity

)

from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant, ChatGrant
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException


api = Blueprint('api', __name__)
import cloudinary.uploader

TWILIO_ACCOUNT_SID='AC0aa7c28700f8db4818bd73e84472b813'
TWILIO_API_KEY_SID='SKa4fb31f83dbbd995ce31cc467edf954c'
TWILIO_API_KEY_SECRET='yJmwbAub7idmWBIB6Qhy2T0EvV966Tsv'
twilio_client = Client(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET,
                       TWILIO_ACCOUNT_SID)



# INDEX VIEW

class Index(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self):
        return '<h1>Index Page</h1>'

class AddUser(Resource,Model):
    def __init__(self):
        self.model = Model()

    def post(self):
        data = request.files['file']
        upload_data = cloudinary.uploader.upload(data)
        photo = upload_data['secure_url']
        name = request.form['name']
        email=request.form['email']
    
        password=request.form['password']
        data = self.model.add_user(name,email,password,photo)
        access_token = create_access_token(identity=email)

        return make_response(jsonify({
            'access_token': access_token,
            'data':data,
            'message': 'Success'

        }), 201)

 
class Auth(Resource,Model):
    def __init__(self):
        self.model = Model()

    def post(self):
        data = request.get_json() 
        if not data:
            return jsonify({'msg': 'Missing JSON'}), 400
        email = data.get('email')
        password = data.get('password')
        user = self.model.login(email,password)
        rooms =  self.model.getRooms()
        
   
        if user:
            access_token = create_access_token(identity=email)
            # add the user to each conversation
            conversations = twilio_client.conversations.conversations.list()
            for conversation in conversations:
                try:
                    conversation.participants.create(identity=email)
                except TwilioRestException as exc:
                    if exc.status != 409:
                        raise
            return make_response(jsonify({
            'access_token': access_token,
            'data':user,
            'rooms':rooms,
            'message': 'Success'
        }), 200)



class Rooms(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self):
        posts =  self.model.getRooms()
        return jsonify(posts)


    def post(self):
        data = request.get_json() 
        conversation = None
        if not data:
            return jsonify({'msg': 'Missing JSON'}), 400

        room = data.get('name')
        self.model.addRoom(room)

        for conv in twilio_client.conversations.conversations.list():
            if conv.friendly_name == room:
                conversation = conv
            break
        if conversation is not None:
            print('Chat room already exists')
        else:
            twilio_client.conversations.conversations.create(friendly_name=room)
            
   

        return make_response(jsonify({
            'message': 'Success'
        }), 200)





class Post(Resource,Model):
    def __init__(self):
        self.model = Model()

    def post(self):
        photo = request.files['file']
        print(photo)
        if photo:
            upload_data = cloudinary.uploader.upload(photo)
            image = upload_data['secure_url']
        message = request.form['message']
        email = request.form['email']
        post = self.model.post(image,message,email)
        return make_response(jsonify({
            "post": post,
            'message': 'Success'

        }), 201)


        

    def get(self):
        posts =  self.model.getPosts()
        story = []
        for post in posts:
            content = {
                "id": post[0],
                "image" : post[1],
                "message": post[2],
                "timestamp":post[3],
                "name":post[4],
                "photo":post[5],
                "isRafiki":post[6]
            }
            story.append(content)
            
        return jsonify(story)



class TokenApi(Resource,Model):
    def __init__(self):
        self.model = Model()
    
    @jwt_required
    def post(self):
        old_token = request.get_data()
        # identity = get_jwt_identity()
    
        return make_response(jsonify({
            'message': 'Success',
            'identity':old_token
        }), 200)



class Room(Resource,Model):

    def __init__(self):
        self.model = Model()

    def get_chatroom(self,name):
        for conversation in twilio_client.conversations.conversations.list():
            if conversation.friendly_name == name:
                return conversation

        # a conversation with the given name does not exist ==> create a new one
        return twilio_client.conversations.conversations.create(
        friendly_name=name)

    def get(self,room_id):
        group = self.model.get_chat(room_id)
        return jsonify(group)


    def post(self,room_id):
        data = request.get_json()
        
        if not data:
            return jsonify({'msg': 'Missing JSON'}), 400

        message = data.get('message')
        email = data.get('email')
        group = self.model.post_chat(message,room_id,email)
        conversation = self.get_chatroom('gambling')

        try:
            conversation.participants.create(identity=email)
        except TwilioRestException as exc:
            # do not error if the user is already in the conversation
            if exc.status != 409:
                raise

        token = AccessToken(TWILIO_ACCOUNT_SID,TWILIO_API_KEY_SID,TWILIO_API_KEY_SECRET,identity=email)
        token.add_grant(VideoGrant(room='gambling'))
        token.add_grant(ChatGrant(service_sid=conversation.chat_service_sid))
        return  {'token': token.to_jwt().decode(),'conversation_sid': conversation.sid}
   


class Comment(Resource,Model):
    def __init__(self):
        self.model = Model()

    def post(self):
        data = request.get_json()
     
        if not data:
            return jsonify({'msg': 'Missing JSON'}), 400

        post_id = data.get('post_id')
        comment = data.get('comment')
        email = data.get('email')
        post = self.model.add_comment(post_id,comment,email)
    
        return make_response(jsonify({
            "post": post,
            'message': 'Success'
        }), 201)


class Respond(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self,post_id):
        comment = self.model.get_comments(post_id)
        return jsonify(comment)


class Find(Resource,Model):

    def __init__(self):
        self.model = Model()

    def post(self):
        data = request.get_json()
     
        if not data:
            return jsonify({'msg': 'Missing JSON'}), 400

        search = data.get('search')
        found = self.model.search_post(search)
        if found:
            return jsonify(found)

           