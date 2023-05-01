from flask import request,Blueprint,jsonify
from app.model.data_model import User
from app import db
from app.model.auth import create_auth_token

users = Blueprint('users', __name__)

@users.route('/register', methods=['POST'])
def add_user():
    """Register a new user"""

    data = request.get_json() 
    if not data:
        return 'Missing JSON'

    response = {
        "username" : data.get('username'),
        "email" : data.get('email'),
        "password" : data.get('password')
    }

    user = User(**response)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'user created successfully'})


@users.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    email = data.get('email')
    password = data.get('password')
    print(data)

    if not email or not password:
        return jsonify({'error': 'Invalid credentials'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'Invalid email'}), 401

    if not user.verify_password(password):
        return jsonify({'error': 'Invalid password'}), 401

    # User is authenticated, return success response
    token = create_auth_token(email)
    return jsonify({'message': 'Login successful', 'user_id': user.id,'token': token}), 200
 





   

