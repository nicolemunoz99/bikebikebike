import {
  SET_STRAVA_ACCESS_STATUS, SET_USER 
} from '../action-types/';

import { setBikes } from './bikes.js';
import { setParts } from './parts.js';
import { updateDataStatus } from './app.js';

import axios from 'axios';
import { normalize, schema } from 'normalizr';

import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports.js";
Amplify.configure(config);


export const setStravaAccessStatus = (bool) => {
  return { type: SET_STRAVA_ACCESS_STATUS, payload: bool };
};

export const setUser = (userInfo) => {
  return { type: SET_USER, payload: userInfo };
};

/********
thunks
********/

export const getUserData = () => async (dispatch) => {
  dispatch(updateDataStatus('dataWait'));
  let userData;
  try {
    let authData = await Auth.currentAuthenticatedUser();
    let response = await axios.get(`${process.env.THIS_API}/api/login`, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });

    if (response.status === 201) { // user hasn't granted strava permissions
      dispatch(setStravaAccessStatus(false));
      dispatch(updateDataStatus('ok'));
      return;
    } else {
      dispatch(setStravaAccessStatus(true));
    }

    userData = response.data;
    console.log('userData: ', userData);

    const part = new schema.Entity('parts',
      {},
      { idAttribute: 'part_id' }
    );

    const bike = new schema.Entity('bikes',
      { parts: [part] },
      { idAttribute: 'bike_id' }
    );

    const user = new schema.Entity('user',
      { bikes: [bike] },
      { idAttribute: 'id' }
    );


    const normalUserData = await normalize(userData, user);

    console.log('normalized', normalUserData);
    dispatch(setBikes(normalUserData.entities.bikes));
    dispatch(setUser(normalUserData.entities.user[normalUserData.result]));
    if (normalUserData.entities.parts) dispatch(setParts(normalUserData.entities.parts));

    dispatch(updateDataStatus('ok'));
  }

  catch (err) {
    
    if (err.response.status === 401) { } // user not Cognito-authenticated; 
      // TODO redirect to login
    //else
    dispatch(updateDataStatus('dataErr'))

  }

  // /////////////////
  // // DEV DATASET
  // let userData = devData;
  // // end DEV DATASET
  // /////////////////



}