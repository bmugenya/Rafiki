import os, re , datetime
from json import dumps, loads
from flask import Blueprint
from flask_restful import Resource
from flask import (
    jsonify,make_response,request,Response,
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

class AddUser(Resource,Model):
    def __init__(self):
        self.model = Model()

    def post(self):
        form =  RegistrationForm(request.form)
        photo = request.form['photo']
        name = request.form['name']
        email=request.form['email']
        password=request.form['pword']
        self.model.add_user(name,email,password,photo)
 
class Post(Resource,Model):
    def __init__(self):
        self.model = Model()

    def post(self):
        data = request.get_json()
     
        if not data:
            return jsonify({'msg': 'Missing JSON'}), 400

        image = data.get('image')
        message = data.get('message')
        email = data.get('email')
        post = self.model.post(image,message,email)
        print(message)

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
                "photo":post[5]
            }
            story.append(content)
            
        return jsonify(story)



class Stories(Resource,Model):
    def __init__(self):
        self.model = Model()

    def get(self):
        return '<h1>Stories Page</h1>'
