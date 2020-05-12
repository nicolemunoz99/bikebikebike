import {
  SET_PARTS, 
  SET_SELECTED_PART, 
  RESET_SELECTED_PART, 
  SET_EDITING_PART,
  RESET_EDITING_PART, 
  SET_DEFAULT_PARTS
} from '../action-types/';
import { openModal, closeModal } from './appControls.js';
import { getUserData } from './user.js';
import axios from 'axios';
import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports.js";
Amplify.configure(config);


export const setParts = (parts) => {
  return { type: SET_PARTS, payload: parts };
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

export const resetEditingPart = () => {
  return { type: RESET_EDITING_PART };
};

export const setDefaultParts = (defaultValues) => {
  return { type: SET_DEFAULT_PARTS, payload: defaultValues};
};

// ... async / thunks ...
export const retirePart = (partId) => async (dispatch) => {
  try {
    dispatch(openModal('dataWait'));
    console.log('Auth in parts.js', Auth)
    let authData = await Auth.currentAuthenticatedUser();

    await axios.put(`${process.env.THIS_API}/api/part/retire?partId=${partId}`, {}, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });

    dispatch(getUserData());
    dispatch(closeModal('dataWait'));
    dispatch(closeModal('confirmRetire'));
  }
  catch (err) {
    console.log('err', err)
    dispatch(openModal('err'))
  }
};

export const servicePart = (partId) => async (dispatch) => {
  dispatch(openModal('dataWait'));
  try {
    let authData = await Auth.currentAuthenticatedUser();
    console.log('authData: ', authData);
    await axios.put(`${process.env.THIS_API}/api/service/part?partId=${partId}`, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });
    
    dispatch(getUserData());
    dispatch(closeModal('dataWait'));
  }
  catch (err) {
    console.log('err', err);
    dispatch(closeModal('dataWait'));
    dispatch(openModal('err'));
  }
};