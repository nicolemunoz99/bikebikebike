import {
  SET_PARTS, 
  SET_SELECTED_PART, 
  RESET_SELECTED_PART, 
  SET_EDITING_PART,
  RESET_EDITING_PART, 
  SET_DEFAULT_PARTS,
  SET_PARTS_TO_SORT
} from '../action-types/';

import { httpReq } from './httpReqs.js';
import { closeModal } from './appControls.js';
import { getUserData } from './user.js';
import axios from 'axios';


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

export const setPartsToSort = (partIds) => {
  return { type: SET_PARTS_TO_SORT, partIds};
};

// default tracking metrics
export const getDefaults = () => async (dispatch, getState) => {
  let distUnit = getState().user.measure_pref;
  let defaults = (await axios.get(`${process.env.THIS_API}/defaultMetric?distUnit=${distUnit}`)).data;

  dispatch(setDefaultParts(defaults));
}

export const retirePart = (partId) => async (dispatch) => {
  await dispatch(httpReq('put', `/part/retire?partId=${partId}`));
  dispatch(getUserData());
  dispatch(closeModal('confirmRetire'));
};

export const servicePart = (partId) => async (dispatch) => {
  await dispatch(httpReq('put', `/api/part/service?partId=${partId}`));
  dispatch(getUserData());
};