import React,{  useState,useEffect, useRef  } from 'react'
import Video from 'twilio-video';
import { url } from '../context/url'

export default function VideoConference({ identity = 'mugenya@gmail.com', roomName='gambling' }) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(`${url}/video/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identity, room: roomName }),
      });
      const { token } = await response.json();
      return token;
    };

    const connectToRoom = async () => {
      const token = await fetchToken();
      const room = await Video.connect(token);
      setRoom(room);
    };

    connectToRoom();
  }, [identity, roomName]);

  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [room]);

  if (room) {
    return <div>Connected to {roomName}</div>;
  } else {
    return <div>Connecting to {roomName}...</div>;
  }
}
