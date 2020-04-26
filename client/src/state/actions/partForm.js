import {
  FORM_INPUT, 
  RESET_FIELDS, 
  RESET_FORM, 
  UPDATE_REQS, 
  VALIDATE_FIELD, 
  VALIDATE_FORM, 
  SET_FORM_FOR_EDIT
} from '../action-types/';

import { getUserData } from './user.js';
import { setSelectedBike } from './bikes.js';
import { setDefaultParts } from './parts.js';
import { setModal, updateDataStatus } from './app.js';


import axios from 'axios';
import _ from 'lodash';
import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports.js";
Amplify.configure(config);

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

/********
thunks
********/

export const showNewPartForm = (bikeId) => (dispatch) => {
  dispatch(getDefaults());
  dispatch(setSelectedBike(bikeId));
  dispatch(setModal('newPartForm'));
};

export const showEditPartForm = (partId) => (dispatch, getState) => {
  partId = partId || getState().parts.editingPart
  dispatch(setEditingPart(partId));
  dispatch(setModal('editPartForm'));

  let origPart = getState().parts.list[partId];
  origPart.lifespan_date = xDate(origPart.lifespan_date).toString('yyyy-MM-dd')
  origPart = _.reduce(origPart, (dataTot, value, fieldName) => {
    return value !== null ? [...dataTot, { [fieldName]: value }] : dataTot;
  }, []);
  
  dispatch(updateEditPartForm(origPart));
  dispatch(validateForm(false)) // disable submit
};


export const updatePartForm = (dataArr) => async (dispatch, getState) => {

  if (dataArr.length === 1) {
    let partType = getState().form.inputs.type;
    let data = dataArr[0];
    let fieldName = Object.keys(data)[0];

      if (data.type) dispatch(resetForm());

      if (data.tracking_method) {
        dispatch(resetFields([
          'use_metric_dist', 'use_metric_time', 'use_metric_date',
          'new_at_add', 'new_date',
          'lifespan_dist', 'lifespan_time', 'lifespan_date'
        ]));
      }

    if (data.tracking_method === 'default') {
      let defaultMetric = getState().parts.default[partType].metrics;
      dataArr = [
        ...dataArr,
        { new_at_add: 'y' },
        { new_date: xDate(false).toString('yyyy-MM-dd') },
        ...defaultMetric
      ];
    }

    if (/use_metric_*/.test(fieldName)) {
      dispatch(resetFields([ `lifespan_${fieldName.split('_')[2]}` ]));
    }

    if (data.new_at_add) {
      dispatch(resetFields(['new_date', 'lifespan_dist', 'lifespan_time', 'lifespan_date']));
      if (data.new_at_add === 'y') dataArr.push({ new_date: xDate(false).toString('yyyy-MM-dd') });
    }
  }

  dispatch(updateValidation(dataArr));

};

export const updateEditPartForm = (dataArr) => async (dispatch, getState) => {
  let { inputs } = getState().form;
  let partType = inputs.type;
  
  if (dataArr.length === 1) {
    let data = dataArr[0];
    let fieldName = Object.keys(data)[0];
    let value = data[fieldName]

    if (data.tracking_method === 'default') {
      let defaultMetric = getState().parts.default[partType].metrics
      dataArr = [ ...dataArr, ...defaultMetric ];
    } 

    if ( (fieldName.includes('use_metric_') || fieldName.includes('lifespan_')) && inputs.tracking_method === 'default' ) {
      if (Number(value) && Number(value) == Number(inputs[fieldName])) dataArr.push({ tracking_method: 'custom' });
      else if (value !== inputs[fieldName]) dataArr.push({ tracking_method: 'custom' });
      else if ( value !== inputs[fieldName] ) dataArr.push({ tracking_method: 'custom' });

      if (Number(value)) {
        dataArr = Number(value) == Number(inputs[fieldName]) ? dataArr : [ ...dataArr, { tracking_method: 'custom' } ];
      } else {
        dataArr = value == inputs[fieldName] ? dataArr : [ ...dataArr, { tracking_method: 'custom' } ];
      }
    }
  }

  dispatch(updateValidation(dataArr));
  dispatch(checkIfEqualToOrig()) // only allow submit if part has been changed

};

const checkIfEqualToOrig = () => (dispatch, getState) => {
  let { inputs } = getState().form;
  let origPart = getState().parts.list[getState().parts.editingPart];
  let isEqualToOrig = _.every(inputs, (value, fieldName) => {
    if (typeof value !== 'boolean' && !value) return !value === !origPart[fieldName];
    if (Number(value)) return Number(value) === Number(origPart[fieldName]);
    return value === origPart[fieldName];
  });

  if (isEqualToOrig) dispatch(validateForm(false)); // disable submit
};
    
const updateValidation = (dataArr) => (dispatch, getState) => {
  dispatch(formInput(dataArr));
  dispatch(updateReqs());
  dispatch(validateField());
  dispatch(validateForm());
};


// API calls:

export const getDefaults = () => async (dispatch, getState) => {
  let distUnit = getState().user.measure_pref;
  let defaults = (await axios.get(`${process.env.THIS_API}/defaultMetric?distUnit=${distUnit}`)).data;
  console.log('defaults in thunk', defaults)
  dispatch(setDefaultParts(defaults))
}

export const submitNewPart = (data) => async (dispatch, getState) => {
  let distUnit = getState().user.measure_pref;
  console.log('distUnit', distUnit)
  dispatch(updateDataStatus('dataWait'));
  try {
    let authData = await Auth.currentAuthenticatedUser();

    await axios.post(`${process.env.THIS_API}/api/part?distUnit=${distUnit}`, { data }, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });
    dispatch(updateDataStatus('ok'));
    dispatch(getUserData());
  }
  catch (err) {
    dispatch(updateDataStatus('dataErr'));
  }
};

export const submitEditedPart = (data) => async (dispatch, getState) => {
  dispatch(updateDataStatus('dataWait'));
  let distUnit = getState().user.measure_pref;
  let origPart = getState().parts.list[data.part_id]
  let partId = data.part_id;
  
  data = _.pickBy(data, (value, fieldName) => { // only submit values that have changed
    if (typeof value !== 'boolean' && !value && !value === !origPart[fieldName]) return false;
    if (Number(value) && Number(value) === Number(origPart[fieldName])) return false;
    return value !== origPart[fieldName];
  });

  if (Object.keys(data).length === 0) { // no new info submitted
    dispatch(updateDataStatus('ok'));
    return;
  }; 

  data.part_id = partId;

  try {
    let authData = await Auth.currentAuthenticatedUser();
    await axios.put(`${process.env.THIS_API}/api/part?distUnit=${distUnit}`, { data }, {
      headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    });
    
    dispatch(getUserData());
    dispatch(updateDataStatus('ok'));
  }
  catch (err) {
    dispatch(updateDataStatus('dataErr'));
  }
};