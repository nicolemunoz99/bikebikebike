import { combineReducers } from 'redux';
import _ from 'lodash';
import { 
  FORM_INPUT, 
  RESET_SUBSEQ_FIELDS, 
  RESET_FORM,
  UPDATE_REQS,
  VALIDATE
} from '../action-types.js';
import { isValid, errMsgs } from '../../components/modals/validation.js';


const initialInputState = {
  type: '', 
  custom_type: '', p_brand: '', p_model: '',
  tracking_method: null,
  usage_metric: null,
  init_wear_method: '', 
  p_dist_current: '', p_time_current: '', new_date: '',
  lifespan_dist: '', lifespan_time: ''
};

const fieldReducer = (state = initialInputState, action) => {
  
  if (action.type === FORM_INPUT) {
    return { ...state, ...action.payload };
  }

  if (action.type === RESET_SUBSEQ_FIELDS) {
    let targetField = action.payload;
    let fieldsToReset = 
        _.dropWhile(Object.keys(state), (item) => item !== targetField).slice(1);
    let resetFields = _.pick(initialInputState, fieldsToReset);
    return {...state, ...resetFields};
  }

  if (action.type === RESET_FORM) {
    return initialInputState;
  }
  return state;
};



const initialErrState = {
  // type: '', 
  custom_type: '',
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
};

const errReducer = (state = initialErrState, action) => {
  
  if (action.type === UPDATE_REQS) {
    let newErrState = {...state}
    _.forEach(action.payload, (value, key) => {
      newErrState[key] = value ? errMsgs[key] : '';
    });
    return newErrState;
  }

  if (action.type === VALIDATE) {
    let fieldName = Object.keys(action.payload)[0];
    let value = action.payload[fieldName];
    return { ...state, [fieldName]: !isValid[fieldName](value) ? errMsgs[fieldName] : '' };
  }
  
  return state;
};

// const initialValidationState = {
//     err: {
//       type: '', 
//       custom_type: '',
//       p_brand: '',
//       p_model: '',
//       tracking_method: '',
//       usage_metric: '',
//       init_wear_method: '', 
//       p_dist_current: '', 
//       p_time_current: '', 
//       new_date: '',
//       lifespan_dist: '', 
//       lifespan_time: ''
//     },
//     isReq: {

//     },
//     isValid: {

//     }
// }


export default combineReducers({
  inputs: fieldReducer,
  errs: errReducer
});