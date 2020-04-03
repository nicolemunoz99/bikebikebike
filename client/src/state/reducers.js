import { 
  SET_STRAVA_ACCESS_STATUS, SET_USER, 
  SET_MODAL, CLOSE_MODAL, 
  SET_BIKES, SET_PARTS, 
  UPDATE_FORM, RESET_FIELDS
} from './action-types.js';
import { combineReducers } from 'redux';


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
    return { ...state, ...action.payload };
  }
  if (action.type === RESET_FIELDS) {
    let tempState = { ...state }
    for (let field of action.payload) tempState[field] = initialFormState[field];
    return tempState;
  }
  return state;
}



/////////////////////////////////////////
/////////////////////////////////////////

const initialModalState = '';

const modalReducer = (state = initialModalState, action) => {
  if (action.type === SET_MODAL) {
    return action.payload;
  }
  if (action.type === CLOSE_MODAL) {
    return '';
  }
  return state;
 };

 /////////////////////////////////////////
/////////////////////////////////////////

const initialUserState = {
  hasStravaAccess: true,
  id: null,
  measure_pref: '',
  last_login_date: '',
  join_date: '',
  bikes: []
};

const userReducer = (state = initialUserState, action) => {
  
  if (action.type === SET_STRAVA_ACCESS_STATUS) {
    return { ...state, hasStravaAccess: action.payload };
  }

  if (action.type === SET_USER) {
    return {...state, ...action.payload};
  }

  return state;
};

/////////////////////////////////////////
/////////////////////////////////////////

const initialBikeState = {
  list: {},
  selected: {}
};

const bikeReducer = (state = initialBikeState, action) => {
  if (action.type === SET_BIKES) {
    return { ...state, list: {...action.payload} };
  }
  return state;
};

/////////////////////////////////////////
/////////////////////////////////////////

const initialPartState = {
  list: {}
};

const partReducer = (state = initialPartState, action) => {
  if (action.type === SET_PARTS) {
    return { ...state, list: {...action.payload}}
  }
  return state;
};

export default combineReducers({
  form: formReducer,
  modal: modalReducer,
  user: userReducer, 
  bikes: bikeReducer,
  parts: partReducer,
});

/////////////////////////////////////////
/////////////////////////////////////////
