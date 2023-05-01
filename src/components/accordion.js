import React, { useState } from 'react'
import data from '../utils/data'
import SingleQuestion from './Question'
import '../assets/accordion.css'

export default function Accordion() {
  const [questions, setQuestions] = useState(data)
  return (
    <main>
      <div className='cont'>
        <h3>question and answers about Rafiki</h3>
        <section className='info'>
          {questions.map((question) => {
            return <SingleQuestion key={question.id} {...question} />
          })}
        </section>
      </div>
    </main>
  )
}
