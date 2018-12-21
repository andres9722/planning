import React from 'react'
import './Card.scss'

const Card = ({ onClick, children }) => {
  return (
    <div className='card' onClick={() => onClick(children)}>
      <h1 className='card__number'>{children}</h1>
    </div>
  )
}

export default Card
