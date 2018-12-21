import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBED-jAnaal1bUxXeDbF19ITJwr4ycgsME',
  authDomain: 'planning-granada.firebaseapp.com',
  databaseURL: 'https://planning-granada.firebaseio.com',
  projectId: 'planning-granada',
  storageBucket: 'planning-granada.appspot.com',
  messagingSenderId: '718805362142'
}

const init = () => firebase.initializeApp(config)

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithRedirect(provider)
}

const signOut = () => firebase.auth().signOut()

export { init, login, signOut }
