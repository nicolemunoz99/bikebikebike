import {  UPDATE_FORM, RESET_FIELDS, RESET_FORM } from '../action-types.js';

const initialFormState = {
  type: '', custom_type: '', p_brand: '', p_model: '',
  p_dist_at_add: '', p_time_at_add: '', 
  lifespan_dist: '', lifespan_time: '',
  tracking_method: null, usage_metric: null,
  init_wear_method: '', p_dist_current: '', p_time_current: '', 
  new_date: '', p_date_added: ''
};

const formReducer = (state = initialFormState, action) => {
  
  if (action.type === UPDATE_FORM) {
    let target = action.payload;
    let newData;
    if (target.dropdown) {
      // dropdowns
      newData = {[target.dropdown]: target.id};
    } else {
      // text input and radios
      if (target.value.length > 20) return { ...state };
      newData = {[target.id]: target.value};
    }
    return { ...state, ...newData };
  }

  if (action.type === RESET_FIELDS) {
    let tempState = { ...state }
    for (let field of action.payload) tempState[field] = initialFormState[field];
    return tempState;
  }
  if (action.type === RESET_FORM) {
    return initialFormState
  }
  return state;
}


export default formReducer;