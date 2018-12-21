import React, { useContext } from 'react'
import './Login.scss'
import Button from '../atoms/Button'
import { AuthContext as Context } from '../../providers/AuthProvider'

const Login = () => {
  const { onLogin } = useContext(Context)

  return (
    <div className='login'>
      <h1>granada</h1>
      <Button theme='login__button' onClick={() => onLogin()}>
        Login
      </Button>
    </div>
  )
}

export default Login
