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





video = Blueprint('video', __name__)

# INDEX VIEW

@video.route('/video/token', methods=['POST'])
def generate_video_token():

    data = request.get_json() 
    if not data:
        return 'Missing JSON'
    
    dentity = data.get('identity')
    room = data.get('room')

    token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, identity=dentity)
    token.add_grant(VideoGrant(room=room))
    return jsonify({'token': token.to_jwt()})

