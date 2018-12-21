import React from 'react'
import './ActiveUsers.scss'

const ActiveUsers = ({ users }) => (
  <div className='active'>
    <h1 className='active__title'>Active</h1>
    <div className='active__photos'>
      {users.map(user => (
        <div key={user.email} className='active__indicator'>
          <img className='active__img' src={user.photo} alt='avatar' />
        </div>
      ))}
    </div>
  </div>
)

export default ActiveUsers
