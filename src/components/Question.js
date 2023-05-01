import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
const Question = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <article className='question'>
      <header>
        <h4 className='title'>{title}</h4>
        <button className='btn' onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <RemoveIcon /> : <AddIcon />}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  )
}

export default Question
