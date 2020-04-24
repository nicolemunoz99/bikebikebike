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

import devData from './data.js'
import { normalize, schema } from 'normalizr';


import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);



export const setDataStatus = (str) => {
  return { type: SET_DATA_STATUS, payload: str }
};

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

export const resetEditingPart = () => {
  return { type: RESET_EDITING_PART };
};

export const setDefaultParts = (defaultValues) => {
  return { type: SET_DEFAULT_PARTS, payload: defaultValues};
}

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

export const updateDataStatus = (str) => (dispatch) => {
  dispatch(setDataStatus(str));
  if (str === 'ok') dispatch(closeModal());
  else dispatch(setModal(str));
};


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


/*
API calls
*/

export const getDefaults = (partType, distUnit) => async (dispatch, getState) => {
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
  // only submit values that have changed
  data = _.pickBy(data, (value, fieldName) => {
    if (typeof value !== 'boolean' && !value && !value === !origPart[fieldName]) return false;
    if (Number(value) && Number(value) === Number(origPart[fieldName])) return false;
    return value !== origPart[fieldName];
  });

  if (Object.keys(data).length === 0) { // no new info submitted
    dispatch(updateDataStatus('ok'));
    return;
  }; 

  data.part_id = partId;
  console.log('data: ', data)
  try {
    let authData = await Auth.currentAuthenticatedUser()
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
    dispatch(setParts(normalUserData.entities.parts));

    // dispatch(updateDataStatus('ok'));
  }

  catch (err) {
    // dispatch(updateDataStatus('dataErr'))
    if (err.response.status === 401) { } // user not Cognito-authenticated; 
    // TODO redirect to login
    // TODO otherwise display error modal
  }

  // /////////////////
  // // DEV DATASET
  // let userData = devData;
  // // end DEV DATASET
  // /////////////////



};