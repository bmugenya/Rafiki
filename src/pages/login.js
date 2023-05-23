import { React, useState } from 'react'
import { Form } from '../components'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { authUserAsync } from '../features/user/userActions'


export default function Login() {
  const history = useNavigate()


  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')


  const isInvalid = password === '' || emailAddress === ''
const dispatch = useDispatch()
  const { error } = useSelector((state) => state.user)


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
             <Link to="/signup">
            <Form.Link >Signup Now</Form.Link>
            </Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by google reCapture
          </Form.TextSmall>
         
        </Form.Block>
      </Form.Pane>
    </Form>
  )
}
