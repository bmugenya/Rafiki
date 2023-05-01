import { React, useState } from 'react'
import { Form } from '../components'
import { Navigate, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes'


// redux
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync } from '../features/register/registerActions'
import { useForm } from 'react-hook-form'


export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()
   const { error } = useSelector((state) => state.user)
  const { register, handleSubmit, formState: { errors }, } = useForm()


  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
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
    <>
      <Form>
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
            <Form.Link onClick={handleClose}>SignIn Now</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by google reCapture
          </Form.TextSmall>
        </Form.Block>
      </Form>
    </>
  )
}
