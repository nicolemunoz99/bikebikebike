import axios from 'axios';
import _ from 'lodash';
import xDate from 'xdate';
import {
  SET_DATA_STATUS,
  SET_STRAVA_ACCESS_STATUS, SET_USER,
  SET_BIKES, SET_SELECTED_BIKE, RESET_SELECTED_BIKE,
  SET_PARTS, SET_SELECTED_PART, RESET_SELECTED_PART, SET_EDITING_PART, RESET_EDITING_PART,
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
  
  dispatch(updatePartForm(origPart));
};


export const updatePartForm = (dataArr) => async (dispatch, getState) => {
  let { editingPart } = getState().parts;

  if (dataArr.length === 1) {
    let partType = getState().form.inputs.type;
    let distUnit = getState().user.measure_pref;
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
      let defaultMetric = await dispatch(getDefaultMetric(partType, distUnit));
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

    if (editingPart === '' && data.new_at_add) {
      dispatch(resetFields(['new_date', 'lifespan_dist', 'lifespan_time', 'lifespan_date']));
      if (data.new_at_add === 'y') dataArr.push({ new_date: xDate(false).toString('yyyy-MM-dd') });
    }
  }

  dispatch(formInput(dataArr));

  dispatch(updateReqs());
  dispatch(validateField());
  dispatch(validateForm());

  if (editingPart !== '') {
    dispatch(updateEditedPart())
  }
};

export const updateEditedPart = () => async (dispatch, getState) => {
  let { inputs } = getState().form;
  let origPart = getState().parts.list[getState().parts.editingPart];
  let distUnit = getState().user.measure_pref;
  let partType = inputs.type;


  if (inputs.tracking_method === 'default') {
    let defaultMetric = await dispatch(getDefaultMetric(partType, distUnit));

    let isEqualToDefault = _.every(_.defaults(...defaultMetric), (value, fieldName) => {
      if (typeof value !== 'boolean' && !value) return !value === !inputs[fieldName];
      if (Number(value)) return Number(value) == Number(inputs[fieldName]);
      return value == inputs[fieldName];
    });

    if (!isEqualToDefault) {
      dispatch(updatePartForm( [{ tracking_method: 'custom' }] ));
    } 
  }

  let isEqualToOrig = _.every(origPart, (value, fieldName) => {
    if (typeof value !== 'boolean' && !value) return !value === !inputs[fieldName];
    if (Number(value)) return Number(value) == Number(inputs[fieldName]);
    return value == inputs[fieldName];
  });
  
  if (isEqualToOrig) dispatch(validateForm(false)); // disable submit button
}
    



/*
API calls
*/

export const getDefaultMetric = (partType, distUnit) => async (dispatch, getState) => {
  let metric = (await axios.get(`${process.env.THIS_API}/defaultMetric?partType=${partType}&distUnit=${distUnit}`)).data;
  return metric;
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
  let distUnit = getState().user.measure_pref;
  let origPart = getState().parts.list[data.part_id]

  // only update values that have changed
  let updatedData = _.pickBy(data, (value, fieldName) => value !== origPart[fieldName] );
  console.log('updatedData: ', updatedData)
  dispatch(updateDataStatus('dataWait'));
  try {
    console.log('data in thunk:', data, distUnit)
    // let authData = await Auth.currentAuthenticatedUser()
    // await axios.put(`${process.env.THIS_API}/api/part?distUnit=${distUnit}`, { data }, {
    //   headers: { accesstoken: authData.signInUserSession.accessToken.jwtToken }
    // });
    dispatch(updateDataStatus('ok'));
    // dispatch(getUserData());
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