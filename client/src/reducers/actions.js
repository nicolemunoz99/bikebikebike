import axios from 'axios';
import { SET_AUTH_STATUS, SET_STRAVA_ACCESS_STATUS, SET_USERNAME, SET_USER_DATA } from './action-types.js';

import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);


export const setAuthStatus = (bool) => {
  return { type: SET_AUTH_STATUS, payload: bool };
};

export const setStravaAccessStatus = (bool) => {
  return { type: SET_STRAVA_ACCESS_STATUS, payload: bool };
};

export const setUsername = (str) => {
  return { type: SET_USERNAME, payload: str }
}



// ...THUNKS...

export const getAuthStatus = () => async (dispatch) => {
  console.log('hi');
  try {
    let user = await Auth.currentAuthenticatedUser();
    console.log('amp user: ', user);
    dispatch(setAuthStatus(true));
  }
  catch (err) {
    console.log('ERROR:', err);
    dispatch(setAuthStatus(false));
  }
};

export const getStravaAccessStatus = () => async(dispatch) => {
  try {
    let user = await Auth.currentAuthenticatedUser();
    dispatch(setUsername(user.username));
    console.log('username: ', user.username)
    let response = await axios.get(`${process.env.THIS_API}/api?username=${user.username}`, {
      headers: { accesstoken: user.signInUserSession.accessToken.jwtToken }
    });
    console.log('response from strava check: ', response)
    if (response.status === 200) dispatch(setStravaAccessStatus(true));
  }
  catch (err) {
    console.log('err', err)
    if (err.response.status === 401) dispatch(setStravaAccessStatus(false));
    // otherwise display error modal
  }
};

// export const getUserData = () => async (dispatch) => {
//   try {
//     let response = await axios.get(`${process.env.THIS_API}/api/login?username=${user.username}`, {
//         headers: { accesstoken: user.signInUserSession.accessToken.jwtToken }
//       });
  
//     if (response.status === 201) dispatch(setStravaAccessStatus(false)); // show stravaAuth
//   }
//   catch (err) {
//     if (err.response.status === 401) {} // redirect to login
//     // otherwise display error modal
//   }
// };