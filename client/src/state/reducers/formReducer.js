import { FORM_INPUT, RESET_SUBSEQ_FIELDS, RESET_FORM } from '../action-types.js';
import { combineReducers } from 'redux';
import _ from 'lodash';


const initialFieldState = {
  type: '', 
  custom_type: '', p_brand: '', p_model: '',
  tracking_method: null,

  usage_metric: null,

  init_wear_method: '', 
  p_dist_current: '', p_time_current: '', new_date: '',

  lifespan_dist: '', lifespan_time: ''
};




const fieldReducer = (state = initialFieldState, action) => {
  
  if (action.type === FORM_INPUT) {
    return { ...state, ...action.payload };
  }

  if (action.type === RESET_SUBSEQ_FIELDS) {
    let targetField = action.payload;
    let fieldsToReset = 
        _.dropWhile(Object.keys(state), (item) => item !== targetField).slice(1);
    let resetFields = _.pick(initialFieldState, fieldsToReset);
    return {...state, ...resetFields};
  }

  if (action.type === RESET_FORM) {
    return initialFieldState;
  }
  return state;
};


const initialIsValidState = {
  basics: false,
  trackingMethod: false,
  currentWear: false,
  lifespan: false
};

const isValidReducer = (state = initialIsValidState, action) => {
  
  return state;
};


export default combineReducers({
  fields: fieldReducer,
  isValid: isValidReducer
});