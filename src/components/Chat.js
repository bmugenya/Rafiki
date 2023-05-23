import React, { useState, useEffect } from 'react'
import '../assets/Chat.css'

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic'
import { useParams } from 'react-router-dom'
import VideocamIcon from '@mui/icons-material/Videocam'
import { url } from '../utils/url'

export const ChatContext = React.createContext()

export default function Chat() {
  const [input, setInput] = useState('')
  const [group, setGroup] = useState([])
  const email = "mugenya@gmail.com"
  const { groupName = 'gambling'} = useParams()

  const sendMessage = (e) => {
    e.preventDefault()
    fetch(`${url}/space/${groupName}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input,
        email: email,
      }),
    })

    setInput('')
  }

  useEffect(() => {
    fetch(`${url}/space/${groupName}/messages`)
      .then((res) => res.json())
      .then((data) => {
        setGroup(data.messages)
      })
  }, [groupName])

  return (
    <div className='chat'>
      <div className='chat_body'>
        {group.map((post) => (
          <p className={`chat_message ${post.author === email && 'chat_reciever'}`} key={post.timestamp}>
            <span className='chat_name'>{post.author}</span>
            {post.body}
            <span className='chat_time'>{post.timestamp}</span>
          </p>
        ))}
      </div>
      <div className='footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            send a message
          </button>
        </form>
        <MicIcon />
        <VideocamIcon />
      </div>
    </div>
  )
}
