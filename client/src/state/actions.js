import axios from 'axios';
import _ from 'lodash';
import { 
  SET_DATA_STATUS,
  SET_STRAVA_ACCESS_STATUS, SET_USER,
  SET_BIKES, SET_PARTS, SET_SELECTED_BIKE,
  SET_MODAL, CLOSE_MODAL, 
  FORM_INPUT, RESET_SUBSEQ_FIELDS, RESET_FORM, UPDATE_REQS, VALIDATE_FIELD, VALIDATE_FORM
} from './action-types.js';

import devData from './data.js'
import { normalize, schema } from 'normalizr';


import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);



export const setDataStatus = (str) => {
  return{ type: SET_DATA_STATUS, payload: str}
}

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

export const setSelectedBike = (bikeId) => {
  return { type: SET_SELECTED_BIKE, payload: bikeId };
};

// export const showPartForm = (bikeId) => {

// }

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
  return { type: UPDATE_REQS, payload: {fieldName, value} };
};

export const validateField = () => {
  return { type: VALIDATE_FIELD };
};

export const validateForm = () => {
  return { type: VALIDATE_FORM };
}


// ...THUNKS...

export const updateDataStatus = (str) => (dispatch) => {
  dispatch(setDataStatus(str));
  if (str === 'ok') dispatch(closeModal());
  else dispatch(setModal(str));
}


export const showPartForm = (bikeId) => (dispatch) => {
  dispatch(setModal('partForm'));
  dispatch(setSelectedBike(bikeId));
}

export const updatePartForm = (target) => (dispatch) => {
  let fieldName;
  let value;

  // reset all fields that follow a dropdown/radio that was changed
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
  dispatch(validateField());
  dispatch(validateForm());
};

export const submitNewPart = (data, distUnit) => async (dispatch) => {
  dispatch(updateDataStatus('dataWait'));
  try {
    let authData = await Auth.currentAuthenticatedUser();
    console.log('newpartData:', data)
    await axios.post(`${process.env.THIS_API}/api/part?distUnit=${distUnit}`, data, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });
    dispatch(updateDataStatus('ok'));
  }
  catch (err) {
    dispatch(updateDataStatus('dataErr'));
  }
};


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
    }

    userData = response.data;
    console.log('userData: ', userData);

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

    console.log('normalized', normalUserData);
    dispatch(setBikes(normalUserData.entities.bikes));
    dispatch(setUser(normalUserData.entities.user[normalUserData.result]));
    dispatch(setParts(normalUserData.entities.parts));

    dispatch(updateDataStatus('ok'));
  }

  catch (err) {
    if (err.response.status === 401) {} // user not Cognito-authenticated; 
      // TODO redirect to login
    // TODO otherwise display error modal
  }

  // /////////////////
  // // DEV DATASET
  // let userData = devData;
  // // end DEV DATASET
  // /////////////////



};