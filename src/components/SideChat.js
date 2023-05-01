import React from 'react'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import '../assets/SideChat.css'
import { Link } from 'react-router-dom'
import { url } from '../context/url'

export default function SideChat({ id, name, addChat, message }) {
  const createChat = () => {
    const roomName = prompt('Enter room name')

    if (roomName) {
      fetch(`${url}/chat/room`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roomName,
        }),
      })
    }
  }
  return !addChat ? (
    <Link to={`/chat/${name}`}>
      <div className='chat'>
        <Avatar />
        <div className='info'>
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='chat'>
      <h2>Add new chat</h2>
    </div>
  )
}
