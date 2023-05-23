import React, { useState, useEffect } from 'react'
import '../assets/Bar.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SideChat from './SideChat'
import { url } from '../utils/url'

export default function Bar() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch(`${url}/space`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data)
      })
  }, [])

  return (
    <div className='bar'>
      <div className='search'>
        <div className='container'>
          <SearchOutlinedIcon />
          <input placeholder='Search or start new chat' type='text' />
        </div>
      </div>
      <div className='chats'>
        <SideChat addChat />
        {rooms.map((room) => (
          <SideChat
            key={room.room_id}
            id={room.room_id}
            name={room.name}
            message={room.message}
          />
        ))}
      </div>
    </div>
  )
}
