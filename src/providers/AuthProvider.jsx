import React, { Component, createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { login, signOut } from '../firebase'

export const AuthContext = createContext({})

export class AuthProvider extends Component {
  state = {
    auth: false,
    user: null,
    error: null,
    loading: false
  }

  componentDidMount () {
    const database = firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    database.settings(settings)

    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.user && result.additionalUserInfo.isNewUser) {
          const user = {
            email: result.user.email,
            name: result.user.displayName,
            photo: result.user.photoURL,
            status: true,
            vote: false,
            value: 0
          }

          database
            .collection('users')
            .doc(user.email)
            .set(user)
            .then(result => console.log(result))
            .catch(error => console.error(error))
        }
      })
      .catch(error => console.error(error))

    this.setState({ loading: true })

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          {
            auth: true,
            loading: false,
            user: user
          },
          () => {
            const database = firebase.firestore()
            const settings = { timestampsInSnapshots: true }
            database.settings(settings)

            database
              .collection('users')
              .doc(this.state.user.email)
              .update({
                status: true
              })
              .then(result => console.log(result))
              .catch(error => console.log(error))
          }
        )
      } else {
        this.setState({ loading: false })
      }
    })
  }

  componentWillUnmount () {
    if (this.unsubscribe) this.unsubscribe()
  }

  onLogin = () => {
    this.setState({ loading: true })

    login()
      .then(() => {
        this.setState({
          loading: false,
          auth: true
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: `Error: ${error.message}`
        })
      })
  }

  onSignOut = () => {
    signOut()
      .then(() => {
        const database = firebase.firestore()
        const settings = { timestampsInSnapshots: true }
        database.settings(settings)

        database
          .collection('users')
          .doc(this.state.user.email)
          .update({
            status: false,
            value: 0,
            vote: false
          })

        this.setState({ auth: false, user: null })
      })
      .catch(error => {
        this.setState({ error: `Error: ${error.message}` })
      })
  }

  render () {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          onLogin: this.onLogin,
          onSignOut: this.onSignOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const AuthConsumer = AuthContext.Consumer
