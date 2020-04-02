import axios from 'axios';
import { SET_STRAVA_ACCESS_STATUS, SET_USER, SET_BIKES, SET_PARTS, SET_MODAL } from './action-types.js';
import devData from './data.js'
import { normalize, schema } from 'normalizr';


import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);


export const setStravaAccessStatus = (bool) => {
  return { type: SET_STRAVA_ACCESS_STATUS, payload: bool };
};

export const setUser = (userInfo) => {
  return { type: SET_USER, payload: userInfo };
};

export const setModal = (modalType) => {
  return { type: SET_MODAL, payload: modalType };
}

export const setBikes = (bikes) => {
  return { type: SET_BIKES, payload: bikes };
};

export const setParts = (parts) => {
  return { type: SET_PARTS, payload: parts };
}



// ...THUNKS...


export const getUserData = () => async (dispatch) => {
  // console.log('..get user data');
  // try {
  //   let user = await Auth.currentAuthenticatedUser();
  //   let response = await axios.get(`${process.env.THIS_API}/api/login`, {
  //       headers: { accesstoken: user.signInUserSession.accessToken.jwtToken }
  //     });
    
  //   if (response.status === 201) { // user hasn't granted strava permissions
  //     dispatch(setStravaAccessStatus(false));
  //     return;
  //   } 

  //   console.log('data: ', response.data);
  //   dispatch(setUserData(response.data));

  // }

  // catch (err) {
  //   if (err.response.status === 401) {} // user not Cognito-authenticated; 
  //   // TODO redirect to login
  //   // TODO otherwise display error modal
  // }

  /////////////////
  // DEV DATASET
  let userData = devData;

  const part = new schema.Entity('parts', 
    {}, 
    {idAttribute: 'part_id'}
  );

  const bike = new schema.Entity('bikes', 
    {parts: [part]},
    {idAttribute: 'bike_id'}
  );

  const user = new schema.Entity('user', 
    {bikes: [bike]},
    {idAttribute: 'id'}
  );

  const normalUserData = normalize(userData, user);

  console.log('normalized', normalUserData)
  dispatch(setUser(normalUserData.entities.user[normalUserData.result]));
  dispatch(setBikes(normalUserData.entities.bikes));
  dispatch(setParts(normalUserData.entities.parts));

};