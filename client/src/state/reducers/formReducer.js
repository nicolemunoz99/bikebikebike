import _ from 'lodash';
import { 
  FORM_INPUT, 
  RESET_SUBSEQ_FIELDS, 
  RESET_FORM,
  UPDATE_REQS,
  VALIDATE_FIELD,
  VALIDATE_FORM
} from '../action-types.js';
import { isValid } from '../../components/modals/validation.js';


const initialFormState = {
  inputs: {
    type: '', 
    custom_type: '', p_brand: '', p_model: '',
    tracking_method: '',
    usage_metric: '',
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
    custom_type: null,
    p_brand: null,
    p_model: null,
    tracking_method: false,
    usage_metric: null,
    init_wear_method: null, 
    p_dist_current: null, 
    p_time_current: null, 
    new_date: null,
    lifespan_dist: null, 
    lifespan_time: null
  },
  formIsValid: false
};

const formReducer = (state = initialFormState, action) => {
  
  // ui

  if (action.type === FORM_INPUT) {
    return { ...state, inputs: { ...state.inputs, ...action.payload } };
  }

  if (action.type === RESET_SUBSEQ_FIELDS) {
    let targetField = action.payload;
    let fieldsToReset = 
        _.dropWhile(Object.keys(state.inputs), (item) => item !== targetField).slice(1);
    let resetInputs = _.pick(initialFormState.inputs, fieldsToReset);
    let resetIsReq = _.pick(initialFormState.isReq, fieldsToReset);
    let resetIsOk = _.pick(initialFormState.isOk, fieldsToReset);

    return { 
      ...state, 
      inputs: { ...state.inputs, ...resetInputs },
      isOk: { ...state.isOk, ...resetIsOk},
      isReq: { ...state.isReq, ...resetIsReq}
    };
  }


  // validation

  if (action.type === UPDATE_REQS) {
    let newReqs = {};

    if (state.inputs.type === 'custom') {
      newReqs = {custom_type: true}
    }
    if (state.inputs.tracking_method === 'custom') {
      newReqs = {usage_metric: true};
    }

    if (state.inputs.usage_metric) {
      newReqs = { ...newReqs, init_wear_method: true };
      if (state.inputs.usage_metric === 'time') {
        newReqs = {
          ...newReqs,
          lifespan_dist: false,
          lifespan_time: true
        }
      }
      
      else if (state.inputs.usage_metric === 'dist') {
        newReqs = {
          ...newReqs,
          lifespan_dist: true,
          lifespan_time: false
        }
      }
      else {
        newReqs = {
          ...newReqs,
          lifespan_dist: true,
          lifespan_time: true
        }
      }
    };

    if (state.inputs.init_wear_method === 'est') {
      if (state.inputs.usage_metric === 'time') {
        newReqs = {
          ...newReqs,
          p_dist_current: false, 
          p_time_current: true
        };
      }
      else if (state.inputs.usage_metric === 'dist'){
        newReqs = {
          ...newReqs,
          p_dist_current: true, 
          p_time_current: false
        };
      }
      else {
        newReqs = {
          ...newReqs,
          p_dist_current: true, 
          p_time_current: true,
          lifespan_dist: true,
          lifespan_time: true
        };
      }
    }
    if (state.inputs.init_wear_method === 'strava') {
      newReqs = { ...newReqs, new_date: true };
    }

    return { ...state, isReq:{ ...state.isReq, ...newReqs }  };

  }

  if (action.type === VALIDATE_FIELD) {
    let newIsOkState =_.mapValues(state.isReq, (isReq, key) => {
      if (!isReq) return initialFormState.isOk[key];
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