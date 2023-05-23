import { React, useState } from 'react'
import '../assets/Sender.css'
import { addCommentAsync } from '../features/comment/commentActions';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import useAuthListener from '../hooks/use-auth-listener'
import { useNavigate } from 'react-router-dom';

function Comment({ id }) {
  const [input, setInput] = useState('')

  const { user } = useAuthListener()
  const history = useNavigate()
 
  const dispatch = useDispatch()


    const handleSubmit = (event) => {
    event.preventDefault()
   let data = {
      'email':user?.email,
      'text':input,
      'post_id': id,
    }

    postData(data)

  }
    const postData = async (data) => {
    const add = await dispatch(addCommentAsync(data))
    const error = add?.error?.message
  !error && history('/home')

  }




  return (
    <div className='sender_bottom'>
      <Avatar  />
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          className='sender_input'
          placeholder={'Write a comment...'}
        />
        <button onClick={handleSubmit} type='submit'>
          Hidden Button
        </button>
      </form>
    </div>
  )
}
export default Comment
