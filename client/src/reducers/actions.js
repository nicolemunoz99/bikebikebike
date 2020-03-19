import { SET_AUTH_STATUS } from './action-types.js';

import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);

export const setAuthStatus = (bool) => {
  return { type: SET_AUTH_STATUS, payload: bool }
};

// ...thunks...

export const getAuthStatus = () => async (dispatch) => {
  try {
    let user = await Auth.currentAuthenticatedUser()
    console.log('user', user);
    dispatch(setAuthStatus(true));
  }
  catch (err) {
    console.log(err);
    dispatch(setAuthStatus(false));
  }
}