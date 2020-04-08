import { combineReducers } from 'redux';
import _ from 'lodash';
import { 
  FORM_INPUT, 
  RESET_SUBSEQ_FIELDS, 
  RESET_FORM,
  UPDATE_REQS,
  VALIDATE,
  CHECK_SUBMIT
} from '../action-types.js';
import { isValid } from '../../components/modals/validation.js';


const initialFormState = {
  inputs: {
    type: '', 
    custom_type: '', p_brand: '', p_model: '',
    tracking_method: null,
    usage_metric: null,
    init_wear_method: '', 
    p_dist_current: '', p_time_current: '', new_date: '',
    lifespan_dist: '', lifespan_time: ''
  },
  isReq: {
    type: true, 
    custom_type: false,
    p_brand: false,
    p_model: false,
    tracking_method: true,
    usage_metric: false,
    init_wear_method: false, 
    p_dist_current: false, 
    p_time_current: false, 
    new_date: false,
    lifespan_dist: false, 
    lifespan_time: false
  },
  isOk: {
    type: false, 
    custom_type: false,
    p_brand: true,
    p_model: true,
    tracking_method: false,
    usage_metric: false,
    init_wear_method: false, 
    p_dist_current: false, 
    p_time_current: false, 
    new_date: false,
    lifespan_dist: false, 
    lifespan_time: false
  }
};

const formReducer = (state = initialFormState, action) => {
  
  // ui

  if (action.type === FORM_INPUT) {
    return { ...state, inputs: { ...state.inputs, ...action.payload } };
  }

  if (action.type === RESET_SUBSEQ_FIELDS) {
    let targetField = action.payload;
    let fieldsToReset = 
        _.dropWhile(Object.keys(state), (item) => item !== targetField).slice(1);
    let resetFields = _.pick(initialFormState.inputs, fieldsToReset);
    return { ...state, inputs: { ...state.inputs, ...resetFields } };
  }

  // validation

  if (action.type === UPDATE_REQS) {
    let updatedRequiredFields = {...state.isReq, ...action.payload}
    return { ...state, isReq: updatedRequiredFields };
  }

  if (action.type === VALIDATE) {
    let newIsOkState =_.mapValues(state.isReq, (isReq, key) => {
      if (!isReq) return true;
      return isValid[key](state.inputs[key]);
    });
    return { ...state, isOk: newIsOkState };
  }

  // reset

  if (action.type === RESET_FORM) {
    return initialFormState;
  }

  return state;
};


export default formReducer;