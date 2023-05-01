import React, { useState } from 'react'
import '../assets/consent.css'
import { Form } from '../components'
import { url } from '../context/url'

export default function Consent() {
  const [error, setError] = useState('')
  const [cname, setCname] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [nationality, setNationality] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const [expectation, setExpectation] = useState('')
  const [coping, setCoping] = useState('')
  const [harm, setHarm] = useState('')
  const [addictions, setAddictions] = useState('')
  const [other, setOther] = useState('')
  const handleSignIn = (event) => {
    event.preventDefault()
    setError('')
    fetch(`${url}/rafiki/form`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cname: cname,
        gender: gender,
        age: age,
        nationality,
        email: email,
        phone: phone,
        reason: reason,
        expectation: expectation,
        coping: coping,
        harm: harm,
        addictions: addictions,
        other: other,
      }),
    })
      .then((r) => r.json())
      .then((request) => {
        if (request) {
          localStorage.setItem('auth_user', JSON.stringify(request))
        } else {
          localStorage.removeItem('auth_user')
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }
  return (
    <Form>
      <Form.Panel>
        <Form.Blocked>
          <Form.Title>Questionaire</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Text>
            In our counseling we abide to all counseling ethics. Any information
            shared is kept in the strict safety. Our messages and emails are end
            to end encrypted. All therapists own a computer where they work from
            (we don’t share emails passwords, laptops, desktops, or phones).
            Confidentiality is paramount and we ensure our systems are free from
            online hackers by putting online sensors to detect any intruder to
            our lines. As we continue with our counseling sessions, the client
            is free to suggest to delete any information which is oversensitive.
          </Form.Text>
          <Form.Text>
            NB: But we can breach confidentiality on the following:
          </Form.Text>
          <ol>
            <li>
              On issue(s) which we consider are a threat or subject client’s
              life or others at risk.
            </li>
            <li>
              On issues which contravene the security of client, therapist,
              others, or of the nation.
            </li>
            <li> Any crime which need to be reported to security agencies.</li>
          </ol>

          <Form.Text></Form.Text>
          <Form.Text>
            This agreement is construed and governed in all respects in
            accordance with the laws of Kenya and any contract is subjected on
            the same. All client material is treated in complete confidence.
            Electronic records are stored on a secure network, and are password
            protected and encrypted. It is not acceptable for either client or
            therapist to publicize any content thereof, exchange, or share with
            third party.
          </Form.Text>
          <Form.Base onSubmit={handleSignIn} method='POST'>
            <Form.Input
              placeholder='Full Name'
              value={cname}
              onChange={({ target }) => setCname(target.value)}
            />
            <Form.Input
              placeholder='Gender'
              value={gender}
              onChange={({ target }) => setGender(target.value)}
            />
            <Form.Input
              placeholder='Age'
              value={age}
              onChange={({ target }) => setAge(target.value)}
            />
            <Form.Input
              placeholder='Nationality'
              value={nationality}
              onChange={({ target }) => setNationality(target.value)}
            />
            <Form.Input
              placeholder='Email address'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Form.Input
              placeholder='Mobile Phone'
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />

            <Form.Input
              placeholder='What is your reason for seeking online counseling'
              value={reason}
              onChange={({ target }) => setReason(target.value)}
            />
            <Form.Input
              placeholder='What would you like to gain from this online counseling'
              value={expectation}
              onChange={({ target }) => setExpectation(target.value)}
            />
            <Form.Input
              placeholder='Have you received help from friends, family, colleagues etc.'
              value={coping}
              onChange={({ target }) => setCoping(target.value)}
            />
            <Form.Input
              placeholder='Do you have any difficulties with drugs like bhang, alcohol etc?'
              value={addictions}
              onChange={({ target }) => setAddictions(target.value)}
            />
            <Form.Input
              placeholder='Have you ever had any self harm thoughts?'
              value={harm}
              onChange={({ target }) => setHarm(target.value)}
            />
            <Form.Input
              placeholder='What else do you think is important to know?'
              value={other}
              onChange={({ target }) => setOther(target.value)}
            />

            <Form.Submit type='submit'>Submit</Form.Submit>
          </Form.Base>
          <Form.TextSmall>
            This page is protected by google reCapture
          </Form.TextSmall>
        </Form.Blocked>
      </Form.Panel>
    </Form>
  )
}
