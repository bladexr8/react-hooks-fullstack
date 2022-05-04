/**
 * used to update the authentication state 
 * of the user and retrieve the user profile 
 * data and save it to the global state.
 */

import React, { useEffect, useContext } from 'react';
import history from './history';
import Context from './context';
import * as ACTIONS from '../store/actions/actions';

// this component will be rendered every time a user
// logs in and out. Having one component render after
// every login and logout will save us from having
// to handle and update the context authentication
// state in every component

// update the authentication state with
// useEffect() hook
const AuthCheck = () => {
  
  // set up useContext() hook
  const context = useContext(Context)

  useEffect(() => {
    // tokens in local storage haven't expired
    // and  user is still authenticated
    if (context.authObj.isAuthenticated()) {
      // change login state to true and
      // save user profile data to the
      // global state
      context.handleUserLogin()
      context.handleUserAddProfile(context.authObj.userProfile)
      history.replace('/')
    } else {
      context.handleUserLogout()
      context.handleUserRemoveProfile()
      history.replace('/')
    }
  }, [])

  // return empty div since we are only updating state
  return (
    <div></div>
  )
}

export default AuthCheck;