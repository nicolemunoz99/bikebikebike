import axios from 'axios';
import _ from 'lodash';
import { 
  SET_DATA_STATUS,
  SET_STRAVA_ACCESS_STATUS, SET_USER,
  SET_BIKES, SET_SELECTED_BIKE, RESET_SELECTED_BIKE,
  SET_PARTS, SET_SELECTED_PART, RESET_SELECTED_PART, SET_EDITING_PART,
  SET_MODAL, CLOSE_MODAL, 
  FORM_INPUT, RESET_FIELDS, RESET_FORM, UPDATE_REQS, VALIDATE_FIELD, VALIDATE_FORM, SET_FORM_FOR_EDIT
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
  console.log('set modal: ', modalType)
  return { type: SET_MODAL, payload: modalType };
};

export const closeModal = () => {
  console.log('closing modal');
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

export const resetSelectedBike = () => {
  return { type: RESET_SELECTED_BIKE };
};

export const setSelectedPart = (partId) => {
  return { type: SET_SELECTED_PART, payload: partId };
};

export const resetSelectedPart = () => {
  return { type: RESET_SELECTED_PART };
};

export const setEditingPart = (partId) => {
  return { type: SET_EDITING_PART, payload: partId };
};

/* **************************
Form
************************** */

export const formInput = (keyValue) => {
 return { type: FORM_INPUT, payload: keyValue};
};

export const resetFields = (fieldArr) => {
  return { type: RESET_FIELDS, payload: fieldArr };
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
};

export const setFormForEdit = (fieldsAndValues) => {
  return { type: SET_FORM_FOR_EDIT, payload: fieldsAndValues };
};


/* **************************
THUNKS
************************** */

export const updateDataStatus = (str) => (dispatch) => {
  dispatch(setDataStatus(str));
  if (str === 'ok') dispatch(closeModal());
  else dispatch(setModal(str));
}


export const showNewPartForm = (bikeId) => (dispatch) => {
  dispatch(setSelectedBike(bikeId));
  dispatch(setModal('newPartForm'));
};

export const showEditPartForm = (bikeId, partId) => (dispatch) => {
  dispatch(setEditingPart(partId));
  dispatch(setModal('editPartForm'));
};

export const updatePartForm = (dataArr) => (dispatch) => {
  console.log('updatePartForm')
  dispatch(formInput(dataArr));
  dispatch(updateReqs());
  dispatch(validateField());
  // dispatch(validateForm());
};

export const submitNewPart = (data, distUnit) => async (dispatch) => {
  // dispatch(updateDataStatus('dataWait'));
  try {
    let authData = await Auth.currentAuthenticatedUser();

    await axios.post(`${process.env.THIS_API}/api/part?distUnit=${distUnit}`, data, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });
    dispatch(updateDataStatus('ok'));
    dispatch(getUserData());
  }
  catch (err) {
    dispatch(updateDataStatus('dataErr'));
  }
};

export const submitEditedPart = (data, distUnit) => async (dispatch) => {
  dispatch(updateDataStatus('dataWait'));
  try {
    console.log('data in thunk:', data, distUnit)
    let authData = await Auth.currentAuthenticatedUser()
    await axios.put(`${process.env.THIS_API}/api/part?distUnit=${distUnit}`, data, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });
    dispatch(updateDataStatus('ok'));
    dispatch(getUserData());
  }
  catch (err) {
    // dispatch(updateDataStatus('dataErr'));
  }
}


export const getUserData = () => async (dispatch) => {
  // dispatch(updateDataStatus('dataWait'));
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
   

    const normalUserData = await normalize(userData, user);

    console.log('normalized', normalUserData);
    dispatch(setBikes(normalUserData.entities.bikes));
    dispatch(setUser(normalUserData.entities.user[normalUserData.result]));
    dispatch(setParts(normalUserData.entities.parts));

    // dispatch(updateDataStatus('ok'));
  }

  catch (err) {
    // dispatch(updateDataStatus('dataErr'))
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