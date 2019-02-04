import React, { useState } from 'react'
import Modal from './Modal'
import './Card.scss'

const Card = ({ onClick, children }) => {
  const [show, setShow] = useState(false)

  const handleOnShow = () => {
    setShow(!show)
  }

  const handleOnSelectValue = value => {
    onClick(value)
    setShow(!show)
  }

  return (
    <>
      <div className='card' onClick={() => handleOnShow()}>
        <h1 className='card__number'>{children}</h1>
      </div>
      <Modal
        show={!!show}
        value={children}
        onSelectValue={handleOnSelectValue}
      />
    </>
  )
}

export default Card
