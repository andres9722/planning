import React from 'react'
import './Button.scss'

const Button = ({ children, theme, onClick, disabled, type, id }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${theme || ''}`}
      type={type || 'button'}
      id={id}
    >
      {children}
    </button>
  )
}

export default Button
