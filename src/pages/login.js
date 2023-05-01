import { React, useState } from 'react'
import { Form } from '../components'
import { Navigate, useNavigate } from 'react-router-dom';
import { url } from '../context/url'
import Signup from './signup'
import Modal from '@mui/material/Modal'
import axios from "axios";


import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { authUserAsync } from '../features/user/userActions'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }))

export default function Login() {
  const history = useNavigate()


  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [user, setUser] = useState([])
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState('')

  const isInvalid = password === '' || emailAddress === ''
const dispatch = useDispatch()
  const { error } = useSelector((state) => state.user)
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const handleSignIn = (event) => {
    event.preventDefault()
   let data = {
      'email':emailAddress,
      'password':password
    }

    authentication(data)

  }
    const authentication = async (data) => {
    const auth = await dispatch(authUserAsync(data))
    const error = auth?.error?.message
     !error && history('/home')

  }
  return (
    <Form>
      <Form.Pane>
        <Form.Title>Rafiki</Form.Title>
        <Form.Text>
          Rafiki offers a safe haven to talk about daily stress that's weighing
          heavily on the mind. It achieves this by offering anonymous
          communication among users. This eradicates the fear of judgment
          enabling users to open up about their well-being in order to get
          reliable feedback. Rafiki is a user who is not anonymous and have
          excellent counseling hence making them more knowledgeable to reply to
          concerns such as stress, depression, anxiety disorders among others.
        </Form.Text>
      </Form.Pane>
      <Form.Pane>
        <Form.Block>
          <Form.Title>signin</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
        
          <Form.Base onSubmit={handleSignIn} method='POST'>
            <Form.Input
              placeholder='Email address'
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type='password'
              placeholder='Password'
              autoComplete='off'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />


            <Form.Submit disabled={isInvalid} type='submit'>
              Sign In
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            New to Rafiki?{' '}
            <Form.Link onClick={handleOpen}>Signup Now</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by google reCapture
          </Form.TextSmall>
         
        </Form.Block>
      </Form.Pane>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Signup />
      </Modal>
    </Form>
  )
}
