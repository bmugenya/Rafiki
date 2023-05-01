import os, re , datetime
from json import dumps, loads
from flask import jsonify,request,Blueprint
from app.model.data_model import Post,Comment
# from app.model.auth import token_auth
from app import db


posts = Blueprint('posts', __name__)

# INDEX VIEW


@posts.route('/post', methods=['POST'])
def add_story():
    """create a new post"""
    # user = token_auth.current_user()
    data = request.get_json() 
    if not data:
        return 'Missing JSON'


    response = { 
    "content" : data.get('text'),
    "author": data.get("email") 
    }
    print(response)
    user = Post(**response)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Post created successfully'})


        
@posts.route('/posts', methods=['GET'])
def get_stories():
    posts = Post.query.all()
    result = []
    for post in posts:
        post_data = {
            "id": post.id,
            "content": post.content,
            "author": post.author
        }
        result.append(post_data)
    return jsonify(result), 200



@posts.route('/comment/<int:id>', methods=['POST'])
def add_comment(id):
    data = request.get_json() 
    if not data:
        return 'Missing JSON'


    response = { 
    "content" : data.get('text'),
    "author": data.get("email"),
    "post_id":id
    }
    print(response)
    user = Comment(**response)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Comment created successfully'})


@posts.route('/comments/<int:id>', methods=['GET'])
def get_comments(id):
    posts = Comment.query.filter_by(post_id=id).all()
    result = []
    for post in posts:
        post_data = {
            "id": post.id,
            "content": post.content,
            "author": post.author
        }
        result.append(post_data)
    return jsonify(result), 200
