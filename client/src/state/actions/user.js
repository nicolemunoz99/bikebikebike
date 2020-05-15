import {
  SET_AUTH_STATE, SET_STRAVA_ACCESS_STATUS, SET_USER
} from '../action-types/';

import { setBikes } from './bikes.js';
import { setParts, getDefaults } from './parts.js';
import { openModal, closeModal } from './appControls.js';

import axios from 'axios';
import { normalize, schema } from 'normalizr';

import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports.js";
Amplify.configure(config);


export const setAuthState2 = (authState) => {
  return { type: SET_AUTH_STATE, authState };
};

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
  dispatch(openModal('dataWait'));
  let userData;
  try {
    let authData = await Auth.currentAuthenticatedUser();

    let response = await axios.get(`${process.env.THIS_API}/api/login`, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });

    if (response.status === 201) { // user hasn't granted strava permissions
      dispatch(setStravaAccessStatus(false));
      dispatch(closeModal('dataWait'));
      return;
    } 
    
    dispatch(setStravaAccessStatus(true));
    
    // normalize state
    userData = response.data;

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


    const normalUserData = normalize(userData, user);

    console.log('normalized', normalUserData);
    dispatch(setBikes(normalUserData.entities.bikes));
    dispatch(setUser(normalUserData.entities.user[normalUserData.result]));
    if (normalUserData.entities.parts) dispatch(setParts(normalUserData.entities.parts));
    await dispatch(getDefaults());
    dispatch(closeModal('dataWait'));
  }

  catch (err) {
    
    dispatch(closeModal('dataWait'));
    dispatch(openModal('err'))

  }

}