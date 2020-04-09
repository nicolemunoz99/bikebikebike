import axios from 'axios';
import _ from 'lodash';
import { 
  SET_STRAVA_ACCESS_STATUS, SET_USER, 
  SET_BIKES, SET_PARTS, 
  SET_MODAL, CLOSE_MODAL, 
  FORM_INPUT, RESET_SUBSEQ_FIELDS, RESET_FORM, UPDATE_REQS, VALIDATE, UPDATE_SHOW_COMPONENTS
} from './action-types.js';

import devData from './data.js'
import { normalize, schema } from 'normalizr';


import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);

/* **************************
User
************************** */

export const setStravaAccessStatus = (bool) => {
  return { type: SET_STRAVA_ACCESS_STATUS, payload: bool };
};

export const setUser = (userInfo) => {
  return { type: SET_USER, payload: userInfo };
};

/* **************************
Modal
************************** */

export const setModal = (modalType) => {
  return { type: SET_MODAL, payload: modalType };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

/* **************************
Bikes and parts
************************** */

export const setBikes = (bikes) => {
  return { type: SET_BIKES, payload: bikes };
};

export const setParts = (parts) => {
  return { type: SET_PARTS, payload: parts };
};

/* **************************
Form
************************** */

export const formInput = (keyValue) => {
 return { type: FORM_INPUT, payload: keyValue};
};

export const resetSubseqFields = (field) => {
  // resets fields that follow the parameter 'field'
  return { type: RESET_SUBSEQ_FIELDS, payload: field };
};

export const resetForm = () => {
  return { type: RESET_FORM };
};

export const updateReqs = (fieldName, value) => {
  return { type: UPDATE_REQS, payload: {fieldName, value} }
};

export const validate = () => {
  return { type: VALIDATE }
};

export const updateShowComponents = () => {
  return { type: UPDATE_SHOW_COMPONENTS }
}


// ...THUNKS...

export const updateForm = (target) => (dispatch) => {
  let fieldName;
  let value;

  // reset all fields following a dropdown/radio that was changed
  if (target.dropdown) {
    dispatch(resetSubseqFields(target.dropdown));
  }
  if (target.radio && target.id !== 'usage_metric') {
    console.log('radio')
    dispatch(resetSubseqFields(target.radio))
  }

  if (target.dropdown) {
    fieldName = target.dropdown;
    value = target.id;
  } else {
    fieldName = target.id;
    value = target.value;
  }
  dispatch(formInput({[fieldName]: value}));
  dispatch(updateReqs(fieldName, value));
  dispatch(validate());
};


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
   
  // end DEV DATASET
  /////////////////

  const normalUserData = normalize(userData, user);

  console.log('normalized', normalUserData)
  dispatch(setUser(normalUserData.entities.user[normalUserData.result]));
  dispatch(setBikes(normalUserData.entities.bikes));
  dispatch(setParts(normalUserData.entities.parts));

};