import React, { useContext } from 'react'
import Card from '../molecules/Card'
import './Cards.scss'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { AuthContext as Context } from '../../providers/AuthProvider'
import Results from '../organisms/Results'

const Cards = ({ users, getUsers }) => {
  const { user } = useContext(Context)

  const database = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  database.settings(settings)

  const handleOnVote = value => {
    database
      .collection('users')
      .doc(user.email)
      .update({
        vote: true,
        value
      })
      .then(result => getUsers())
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className='cards'>
        <Card onClick={handleOnVote}>0</Card>
        <Card onClick={handleOnVote}>1</Card>
        <Card onClick={handleOnVote}>2</Card>
        <Card onClick={handleOnVote}>3</Card>
        <Card onClick={handleOnVote}>4</Card>
        <Card onClick={handleOnVote}>5</Card>
      </div>
      <Results votes={users} />
    </>
  )
}

export default Cards
