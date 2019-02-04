import React from 'react'
import './Modal.scss'

const Modal = ({ value, onSelectValue, show }) => {
  return (
    <div className={show ? 'modal modal--show' : 'modal'}>
      <div className='modal__content'>
        {value === '5' ? (
          <div onClick={() => onSelectValue(5)} className='modal__content-item'>
            <h1> 5.0 </h1>
          </div>
        ) : (
          [...Array(10)].map((item, i) => (
            <div
              onClick={() => onSelectValue(`${value}.${i}`)}
              className='modal__content-item'
            >
              <h1>{`${value}.${i}`} </h1>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Modal
