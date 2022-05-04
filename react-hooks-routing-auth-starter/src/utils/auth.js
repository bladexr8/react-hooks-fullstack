/**
 * will hold all of our authentication 
 * associated functions and variables.
 */

import auth0 from 'auth0-js'
import history from './history';

export default class Auth {
  
  // initialise auth0 app
  auth0 = new auth0.WebAuth({
    domain: 'webapp1.auth0.com',
    clientID: '',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  // userProfile data we get from auth0
  userProfile = {}

  // display auth0 login widget and allow
  // user to log in
  login = () => {
    this.auth0.authorize()
  }

  // save the id and access tokens received from
  // auth0 to local browser storage, and set
  // token expiry time
  handleAuth = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult) {
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)

        let expiresAt = JSON.stringify((authResult.expiresIn * 1000 + new Date().getTime()))
        localStorage.setItem('expiresAt', expiresAt)

        this.getProfile();
        setTimeout(() => { history.replace('/authcheck')}, 600);
      } else {
        console.log(err)
      }
    })
  }

  // get access token from local storage
  getAccessToken = () => {
    if (localStorage.getItem('access_token')) {
      const accessToken = localStorage.getItem('access_token')
      return accessToken
    } else {
      return null
    }
  }

  // Parse access token to extract user profile data
  getProfile = () => {
    let accessToken = this.getAccessToken()
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = { profile }
        }
      })
    }
  }

  // logout user and remove tokens from
  // local storage
  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expiresAt')
    setTimeout(() => { history.replace('/authcheck')}, 200);
  }

  // ensure user is logged in by comparing expiry
  // time to the current time
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
    return new Date().getTime() < expiresAt
  }
}