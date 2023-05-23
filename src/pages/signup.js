import { React, useState } from 'react'
import { Form } from '../components'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync } from '../features/register/registerActions'


export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.user)



  const handleClose = () => {
  // 
  }

  const isInvalid = firstName === '' || password === '' || emailAddress === ''


    const handleSignup = (event) => {
    event.preventDefault()
   let data = {
      'username':firstName,
      'email':emailAddress,
      'password':password
    }
    regUser(data)

  }


  const regUser =  async (data) => {
  const auth = await dispatch(createUserAsync(data))
   const error = auth?.error?.message
    !error && history('/')
  }

  
  return (
      <Form>
           <Form.Pane>

        <Form.Block>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignup} method='POST'>
            <Form.Input
              placeholder='First Name'
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
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
              Sign Up
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Already have an account?{' '}
             <Link to="/">
            <Form.Link>SignIn Now</Form.Link>
   </Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by google reCapture
          </Form.TextSmall>


        </Form.Block>
 </Form.Pane>
             <Form.Pane>
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
      </Form>
  )
}
