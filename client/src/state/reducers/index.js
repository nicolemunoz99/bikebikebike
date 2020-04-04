import { 
  SET_STRAVA_ACCESS_STATUS, SET_USER, 
  SET_MODAL, CLOSE_MODAL, 
  SET_BIKES, SET_PARTS
} from '../action-types.js';

import formReducer from './formReducer.js'
import { combineReducers } from 'redux';


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
