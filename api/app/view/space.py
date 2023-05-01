import os, re , datetime
from json import dumps, loads
from flask import Blueprint


from flask import (
    jsonify,make_response,request,
  Blueprint
)


from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant, ChatGrant
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException




TWILIO_ACCOUNT_SID='AC0aa7c28700f8db4818bd73e84472b813'
TWILIO_API_KEY_SID='SKa4fb31f83dbbd995ce31cc467edf954c'
TWILIO_API_KEY_SECRET='yJmwbAub7idmWBIB6Qhy2T0EvV966Tsv'
twilio_client = Client(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET,
                       TWILIO_ACCOUNT_SID)





space = Blueprint('space', __name__)

# INDEX VIEW

@space.route('/chat/room', methods=['POST'])
def add_space():
    data = request.get_json() 
    conversation = None
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    room = data.get('name')
    # self.model.addRoom(room)

    for conv in twilio_client.conversations.conversations.list():
        if conv.friendly_name == room:
            conversation = conv
            break
    if conversation is not None:
        return jsonify({'msg': 'Chat room already exists'}), 400
    else:
        twilio_client.conversations.conversations.create(friendly_name=room)
        return jsonify({'msg': 'Chat room created'}), 200
            
   
@space.route('/space', methods=['GET'])
def get_chatrooms():
    conversations = twilio_client.conversations.conversations.list()
    return jsonify([{'name': conv.friendly_name, 'sid': conv.sid} for conv in conversations])


@space.route('/space/<string:name>', methods=['GET'])
def get_chatroom(name):
    conversation = None
    for conv in twilio_client.conversations.conversations.list():
        if conv.friendly_name == name:
            conversation = conv
            break

    if conversation is not None:
        messages = []
        for message in conversation.messages.list():
            messages.append({
                'body': message.body,
                'author': message.author,
                'timestamp': str(message.date_created)
            })
        return jsonify({'messages': messages})
    else:
        return jsonify({'msg': f'Chatroom {name} not found'}), 404


@space.route('/space/<string:name>', methods=['POST'])
def post(name):
    data = request.get_json()

    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    message = data.get('message')
    email = data.get('email')

    conversation = None
    for conv in twilio_client.conversations.conversations.list():
        if conv.friendly_name == name:
            conversation = conv
            break

    if conversation is None:
        return jsonify({'msg': f'Chatroom {name} not found'}), 404

    try:
        conversation.participants.create(identity=email)
    except TwilioRestException as exc:
        # do not error if the user is already in the conversation
        if exc.status != 409:
            raise

    conversation.messages.create(author=email, body=message)

    return jsonify({'msg': 'Message sent successfully'})

@space.route('/space/<string:name>/messages', methods=['GET'])
def get_chatroom_messages(name):
    conversation = None
    for conv in twilio_client.conversations.conversations.list():
        if conv.friendly_name == name:
            conversation = conv
            break

    if conversation is not None:
        messages = []
        for message in conversation.messages.list():
            messages.append({
                'body': message.body,
                'author': message.author,
                'timestamp': str(message.date_created)
            })
        return jsonify({'messages': messages})
    else:
        return jsonify({'msg': f'Chatroom {name} not found'}), 404




# @space.route('/space', methods=['POST'])
# def post(self):
#         data = request.get_json() 
#         name=data.get('cname')
#         gender=data.get('gender')
#         age=data.get('age')
#         nationality=data.get('nationality')
#         email=data.get('email')
#         phone=data.get('phone')
#         reason=data.get('reason')
#         expectation=data.get('expectation')
#         coping=data.get('coping')
#         harm=data.get('harm')
#         addictions=data.get('addictions')
#         other=data.get('other')

#         exists = self.model.get_client(email)
#         if exists:
#             self.model.add_consent(reason,expectation,coping,addictions,harm,other,email)
#         else:
#             self.model.add_client(name,gender,age,nationality,email,phone)
#             self.model.add_consent(reason,expectation,coping,addictions,harm,other,email)
