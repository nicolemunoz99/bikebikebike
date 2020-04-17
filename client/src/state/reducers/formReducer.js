import _ from 'lodash';
import {
  FORM_INPUT,
  RESET_FIELDS,
  RESET_FORM,
  UPDATE_REQS,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  SET_FORM_FOR_EDIT
} from '../action-types.js';
import { isValid } from '../../validation.js';


const initialFormState = {
  inputs: {
    type: '',
    custom_type: '', p_brand: '', p_model: '',
    tracking_method: '',
    use_metric_dist: '', use_metric_time: '', use_metric_date: '',
    new_at_add: '',
    new_date: '',
    lifespan_dist: '', lifespan_time: '', lifespan_date: ''
  },
  isReq: {
    type: true,
    custom_type: false,
    p_brand: false, p_model: false,
    tracking_method: true,
    new_at_add: false,
    new_date: false,
    lifespan_dist: false, lifespan_time: false, lifespan_date: false
  },
  isOk: {
    type: false,
    custom_type: null,
    p_brand: null, p_model: null,
    tracking_method: false,
    new_at_add: null,
    new_date: null,
    lifespan_dist: null, lifespan_time: null, lifespan_date: null
  },
  formIsValid: false
};

const formReducer = (state = initialFormState, action) => {

  // ui

  if (action.type === FORM_INPUT) {
    let newInputsState = { ...state.inputs };
    action.payload.forEach((el) => {
      newInputsState = { ...newInputsState, ...el };
    });
    return { ...state, inputs: { ...newInputsState } };
  }

  if (action.type === RESET_FIELDS) {
    let targetFields = action.payload;
    let resetInputs = _.pick(initialFormState.inputs, targetFields);
    let resetIsReq = _.pick(initialFormState.isReq, targetFields);
    let resetIsOk = _.pick(initialFormState.isOk, targetFields);

    return {
      ...state,
      inputs: { ...state.inputs, ...resetInputs },
      isOk: { ...state.isOk, ...resetIsOk },
      isReq: { ...state.isReq, ...resetIsReq }
    };
  }

  if (action.type === SET_FORM_FOR_EDIT) {
    let formValues = _.pickBy(action.payload, (value, key) => {
      return value !== null && initialFormState.inputs[key] !== undefined;
    });
    return { ...state, inputs: { ...state.inputs, ...formValues } };
  }


  // validation

  if (action.type === UPDATE_REQS) {
    let { inputs } = state;
    let newReqs = {};
    
    if (inputs.type === 'custom') {
      newReqs = { custom_type: true };
    }

    if (inputs.tracking_method === 'custom') {
      newReqs = { ...newReqs, new_at_add: true, new_date: true };
    }

    if (inputs.use_metric_dist) newReqs.lifespan_dist = true;
    if (inputs.use_metric_time) newReqs.lifespan_time = true;
    if (inputs.use_metric_date) newReqs.lifespan_date = true;

    return { ...state, isReq: { ...state.isReq, ...newReqs } };
  }


  if (action.type === VALIDATE_FIELD) {
    let newIsOkState = _.mapValues(state.isReq, (req, key) => {
      if (!req) return initialFormState.isOk[key];
      return isValid[key](state.inputs[key]);
    });
    return { ...state, isOk: newIsOkState };
  }

  if (action.type === VALIDATE_FORM) {
    let { isReq, isOk } = state;
    let formIsValid = _.every(isReq, (req, key) => {
      if (!req) return true;
      return isOk[key];
    });
    return { ...state, formIsValid };
  }

  // reset

  if (action.type === RESET_FORM) {
    return initialFormState;
  }

  return state;
};


export default formReducer;

