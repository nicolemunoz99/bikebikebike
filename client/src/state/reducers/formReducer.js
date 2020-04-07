import { combineReducers } from 'redux';
import _ from 'lodash';
import { 
  FORM_INPUT, 
  RESET_SUBSEQ_FIELDS, 
  RESET_FORM,
  UPDATE_REQS,
  VALIDATE 
} from '../action-types.js';
import { errMsgs } from '../../components/modals/validation.js';


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


// const errMsgs = {
//   type: 'Please select a part type.', 
//   custom_type: 'Please specify your part type.',
//   p_brand: '',
//   p_model: '',
//   tracking_method: '',
//   usage_metric: '',
//   init_wear_method: `Select how you want to determine current wear.`, 
//   p_dist_current: `Specify distance for current wear.`, 
//   p_time_current: `Specify hours for current wear.`, 
//   new_date: `Specify a valid date.`,
//   lifespan_dist: `Indicate lifespan in terms of distance.`, 
//   lifespan_time: `Indicate lifespan in terms of hours.`
// };

// const isValid = {
//   // type: (val) => !!val, 
//   custom_type: (val) => !!val,
//   // p_brand: () => true,
//   // p_model: () => true,
//   // tracking_method: (val) => !!val,
//   // usage_metric: (val) => !!val,
//   // init_wear_method: (val) => !!val, 
//   p_dist_current: (val) => !!val && val >= 0,
//   p_time_current: (val) => !!val && val >= 0, 
//   new_date: (val) => !!val && val <= Date.now(),
//   lifespan_dist: (val) => !!val && val >= 0, 
//   lifespan_time: (val) => !!val && val >= 0
// };

const initialErrState = {
  // type: '', 
  custom_type: errMsgs.custom_type,
  // p_brand: '',
  // p_model: '',
  // tracking_method: '',
  // usage_metric: '',
  // init_wear_method: '', 
  p_dist_current: '', 
  p_time_current: '', 
  new_date: '',
  lifespan_dist: '', 
  lifespan_time: ''
}

const errReducer = (state = initialErrState, action) => {
  if (action.type === UPDATE_REQS) {
    let newErrState = {...state}
    _.forEach(action.payload, (value, key) => {
      newErrState[key] = value ? errMsgs[key] : '';
    });
    return newErrState;
  }
  
  // if (action.type === VALIDATE) {
  //   let field = Object.keys(action.payload)[0];
  //   let value = Object.values(action.payload)[0];
  //   if (isValid[field] === undefined) return state;
    
  //   return { ...state, [field]: isValid[field](value) ? '' : errMsgs[field] };
  // }

  // clear err

  // clear all errs
  return state;
};


export default combineReducers({
  fields: fieldReducer,
  errs: errReducer
});