import jwt
import datetime

# Secret key for JWT encoding and decoding
SECRET_KEY = 'your_secret_key_here'

def create_auth_token(email, expiration_hours=1):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=expiration_hours)

    payload = {
        'email': email,
        'exp': expiration
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    return token

def destroy_auth_token(token):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return True
    except jwt.InvalidTokenError:
        return False
