import { React, useState } from 'react'
import '../assets/Sender.css'
import Avatar from '@mui/material/Avatar';
import VideocamIcon from '@mui/icons-material/Videocam'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import { url } from '../context/url'
import useAuthListener from '../hooks/use-auth-listener'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate, useNavigate } from 'react-router-dom';

import { addPostAsync} from '../features/posts/postsActions'

function Sender() {
  const [input, setInput] = useState('')
 const { user, loading } = useAuthListener()
 console.log(user)
  const history = useNavigate()
  const dispatch = useDispatch()

    const handleSubmit = (event) => {
    event.preventDefault()
   let data = {
      'email':user?.email,
      'text':input
    }

    postData(data)

  }
    const postData = async (data) => {
    const add = await dispatch(addPostAsync(data))
    const error = add?.error?.message
     !error && history('/home')

  }



  return (
    <div className='sender'>
      <div className='sender_top'>
        <div className='sender_option'>
          <FormatBoldIcon />
        </div>
        <div className='sender_option'>
          <FormatItalicIcon />
        </div>
        <div className='sender_option'>
          <FormatUnderlinedIcon />
        </div>

        <div className='sender_option'>
          <StrikethroughSIcon />
        </div>
        <div className='sender_option'>
          <FormatQuoteIcon />
        </div>
        <div className='sender_option'>
          <FormatListBulletedIcon />
        </div>
        <div className='sender_option'>
          <FormatListNumberedIcon />
        </div>
      </div>
      <div className='sender_bottom'>
        <Avatar  />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            className='sender_input'
            placeholder={"Whats's on your mind?"}
          />

          <input
            type='file'
            style={{ display: 'none' }}
            id='icon-file'
            className='sender_photo'
            
          />
          <button onClick={handleSubmit} type='submit'>
            Hidden Button
          </button>
        </form>
      </div>
    </div>
  )
}
export default Sender
