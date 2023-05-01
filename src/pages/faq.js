import { React, useState } from 'react'
import { Form } from '../components'

export default function Jumbo() {
  const [user, setUser] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isInvalid = password === '' || emailAddress === ''

  const handleSignIn = (event) => {
    event.preventDefault()
    fetch('/rafiki/auth', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailAddress,
        password: password,
      }),
    })
      .then((r) => r.json())
      .then((request) => {
        if (request.access_token) {

          localStorage.setItem('email', request.data.email)
          localStorage.setItem('image', request.data.image)
          localStorage.setItem('name', request.data.name)
          localStorage.setItem('access_token', request.data.access_token)
        } else {
          console.log('Please type in correct username/password')
        }
      })
      .catch((error) => {
        throw error
      })
  }
  return (
    <Form>
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
        New to Rafiki? <Form.Link to='/signup'>Signup Now</Form.Link>
      </Form.Text>
      <Form.TextSmall>
        This page is protected by google reCapture
      </Form.TextSmall>
    </Form>
  )
}
