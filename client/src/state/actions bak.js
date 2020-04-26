import axios from 'axios';
import _ from 'lodash';
import xDate from 'xdate';
import {
  SET_DATA_STATUS,
  SET_STRAVA_ACCESS_STATUS, SET_USER,
  SET_BIKES, SET_SELECTED_BIKE, RESET_SELECTED_BIKE,
  SET_PARTS, SET_SELECTED_PART, RESET_SELECTED_PART, SET_EDITING_PART, RESET_EDITING_PART, SET_DEFAULT_PARTS,
  SET_MODAL, CLOSE_MODAL,
  FORM_INPUT, RESET_FIELDS, RESET_FORM, UPDATE_REQS, VALIDATE_FIELD, VALIDATE_FORM, SET_FORM_FOR_EDIT
} from './action-types.js';


import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);



/* **************************
Form
************************** */

export const formInput = (keyValue) => {
  return { type: FORM_INPUT, payload: keyValue };
};

export const resetFields = (fieldName) => {
  return { type: RESET_FIELDS, payload: fieldName };
};

export const resetForm = () => {
  return { type: RESET_FORM };
};

export const updateReqs = (fieldName, value) => {
  return { type: UPDATE_REQS, payload: { fieldName, value } };
};

export const validateField = () => {
  return { type: VALIDATE_FIELD };
};

export const validateForm = (bool) => {
  return { type: VALIDATE_FORM, payload: bool };
};

export const setFormForEdit = (fieldsAndValues) => {
  return { type: SET_FORM_FOR_EDIT, payload: fieldsAndValues };
};


/* **************************
THUNKS
************************** */














