import React, { useState, useEffect } from 'react'
import Loader from '../atoms/Loader'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Tuit from '../molecules/Tuit'
import './TuitsList.scss'

const TuitsList = ({ profile, displayName }) => {
  const [tuits, setTuits] = useState([])
  const [tuitsProfile, setTuitsProfile] = useState([])
  const database = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  database.settings(settings)

  useEffect(() => {
    database
      .collection('tuits')
      .orderBy('date', 'desc')
      .onSnapshot(querySnapshot => {
        let arr = []
        querySnapshot.forEach(doc => {
          arr.push({ ...doc.data(), id: doc.id })
          setTuits(arr)
          tuitProfile(arr)
        })
      })
  }, [])

  const tuitProfile = arr => {
    const arrs = arr.filter(tuit => tuit.displayName === displayName)

    const retuits = arr.filter(tuit =>
      tuit.retuits.find(rt => rt.displayName === displayName)
    )

    const finds = retuits.concat(arrs)

    setTuitsProfile(finds)
  }

  return (
    <div className='tuits__container'>
      <ul className='tuits__list'>
        {!tuits.length && <Loader />}
        {!profile && tuits.map((tuit, i) => <Tuit key={i} {...tuit} />)}
        {profile && tuitsProfile.map((tuit, i) => <Tuit key={i} {...tuit} />)}
      </ul>
    </div>
  )
}

export default TuitsList
