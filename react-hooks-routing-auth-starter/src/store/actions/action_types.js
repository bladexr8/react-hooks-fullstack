/**
 * hold all the string actions types in variables
 */

// boiler plate actions
export const SUCCESS = "SUCCESS"
export const FAILURE = "FAILURE"

// update authentication state of the user
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

// save the profile data from Auth0 to the global state.
export const ADD_PROFILE = "ADD_PROFILE"
export const REMOVE_PROFILE = "REMOVE_PROFILE"

// track the changes and submit of the user submitted text of the form
export const USER_INPUT_CHANGE = "USER_INPUT_CHANGE"
export const USER_INPUT_SUBMIT = "USER_INPUT_SUBMIT"
