import React, { useContext, useState, useEffect, Fragment } from 'react'
import Page from './Page'
import { AuthContext as Context } from '../../providers/AuthProvider'
import firebase from 'firebase/app'
import 'firebase/firestore'
import ActiveUsers from '../organisms/ActiveUsers'
import Button from '../atoms/Button'
import './Dashboard.scss'
import Cards from '../templates/Cards'
import logout from '../../assets/logout.png'
import reset from '../../assets/reset.png'

const Dashboard = () => {
  const { onSignOut } = useContext(Context)
  const [users, setUsers] = useState([])

  const database = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  database.settings(settings)

  const getUsers = () =>
    database
      .collection('users')
      .where('status', '==', true)
      .onSnapshot(querySnapshot => {
        let arr = []
        querySnapshot.forEach(doc => {
          arr.push({ ...doc.data(), id: doc.id })
          setUsers(arr)
        })
      })

  useEffect(() => {
    getUsers()
  }, [])

  const onReset = () => {
    users.forEach(user => {
      database
        .collection('users')
        .doc(user.email)
        .update({
          vote: false,
          value: 0
        })
        .then(result => getUsers())
        .catch(error => console.log(error))
    })
  }

  return (
    <Fragment>
      <Page>
        <div className='dashboard'>
          <h1 className='dashboard__title'>Planning granada</h1>
          {users && users.length && <Cards users={users} getUsers={getUsers} />}
          <Button theme='button--signout' onClick={() => onSignOut()}>
            <img src={logout} alt='logout' />
          </Button>
          <Button
            theme='button--reset button--secondary'
            onClick={() => onReset()}
          >
            <img src={reset} alt='reset' />
          </Button>
          <ActiveUsers users={users} />
        </div>
      </Page>
    </Fragment>
  )
}

export default Dashboard
