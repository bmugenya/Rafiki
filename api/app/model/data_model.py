import subprocess
import sys
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Updateable:
    def update(self, data):
        for attr, value in data.items():
            setattr(self, attr, value)


class User(db.Model,Updateable):

    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(128))

    @property
    def avatar_url(self):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon'

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    author = db.Column(db.String(64), db.ForeignKey('users.email'), nullable=False)

    def __repr__(self):
        return '<Post {}>'.format(self.id)



class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    author = db.Column(db.String(64), db.ForeignKey('users.email'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    def __repr__(self):
        return '<Comment {}>'.format(self.id)