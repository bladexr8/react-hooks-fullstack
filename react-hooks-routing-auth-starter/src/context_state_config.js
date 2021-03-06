/**
 * business logic for reading and updating the global state
 * hold all the logic for reading and updating the global 
 * state with the useReducer hook and context
 */

import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as Reducer1 from './store/reducers/plain_reducer';
import * as AuthReducer from './store/reducers/auth_reducer';
import * as FormReducer from './store/reducers/form_reducer';

import AppRoutes from './routes';

import Auth from './utils/auth';

// initialise auth class
const auth = new Auth()

const ContextState = () => {

  /**
   * Plain Reducer
   */
  const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1, Reducer1.initialState)

  const handleDispatchTrue = () => {
    // dispatchReducer1(type: "SUCCESS")
    // dispatchReducer1(ACTIONS.SUCCESS)
    dispatchReducer1(ACTIONS.success())
  }

  const handleDispatchFalse = () => {
    // dispatchReducer1(type: "FAILURE")
    // dispatchReducer1(ACTIONS.FAILURE)
    dispatchReducer1(ACTIONS.failure())
  }

  /**
   * Auth Reducer
   */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)

  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success())
  }

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure())
  }

  const handleAddProfile = (profile) => {
    dispatchAuthReducer(ACTIONS.add_profile(profile))
  }

  const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.remove_profile())
  }

  /**
   * Form Reducer
   */
  const [stateFormReducer, dispatchFormReducer] = useReducer(FormReducer.FormReducer, FormReducer.initialState)

  const handleFormChange = (event) => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.persist();
    dispatchFormReducer(ACTIONS.user_input_submit(event.target.useContext.value))
  }

  // Handle authentication from callback
  // props.location.hash is a given react-router
  // functionality that checks if any value in
  // the URL hash fragment. If Auth0 successfully
  // authenticates a user, the access and id tokens
  // will be included in a hash after the url, making
  // props.location.hash true, which will invoke
  // the handleAuth function in the Auth class
  const handleAuthentication = (props) => {
    if (props.location.hash) {
      auth.handleAuth()
    }
  }

  return (
    <div>
      <Context.Provider
        value={{
          //Reducer1
          stateProp1: stateReducer1.stateprop1,
          stateProp2: stateReducer1.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          // Form Reducer
          useContextChangeState: stateFormReducer.user_textChange,
          useContextSubmitState: stateFormReducer.user_textSubmit,
          useContextSubmit: (event) => handleFormSubmit(event),
          useContextChange: (event) => handleFormChange(event),

          // Auth Reducer
          authState: stateAuthReducer.is_authenticated,
          profileState: stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: (profile) => handleAddProfile(profile),
          handleuserRemoveProfile: () => handleRemoveProfile(),

          // Handle Auth
          handleAuth: (props) => handleAuthentication(props),
          // pass down entire Auth class and allow all
          // components to access our authentication
          // functions and variables
          authObj: auth
          
        }}>
          <AppRoutes />
        </Context.Provider>
    </div>
  )

}

export default ContextState;