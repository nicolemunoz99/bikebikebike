import axios from 'axios';
import { SET_STRAVA_ACCESS_STATUS, SET_USER_DATA } from './action-types.js';

import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);


export const setStravaAccessStatus = (bool) => {
  return { type: SET_STRAVA_ACCESS_STATUS, payload: bool };
};

export const setUserData = (obj) => {
  return { type: SET_USER_DATA, payload: obj };
};

// ...THUNKS...


export const getUserData = () => async (dispatch) => {
  console.log('..get user data');
  try {
    let user = await Auth.currentAuthenticatedUser();
    let response = await axios.get(`${process.env.THIS_API}/api/all-data`, {
        headers: { accesstoken: user.signInUserSession.accessToken.jwtToken }
      });
    
    if (response.status === 201) { // user hasn't granted strava permissions
      dispatch(setStravaAccessStatus(false));
      return;
    } 

    console.log('data: ', response.data);
    dispatch(setUserData(response.data));

  }

  catch (err) {
    if (err.response.status === 401) {} // user not Cognito-authenticated; TODO redirect to login
    // TODO otherwise display error modal
  }
};