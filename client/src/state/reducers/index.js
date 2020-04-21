import { 
  SET_DATA_STATUS,
  SET_STRAVA_ACCESS_STATUS, SET_USER,
  SET_MODAL, CLOSE_MODAL, 
  SET_BIKES, SET_SELECTED_BIKE, RESET_SELECTED_BIKE,
  SET_PARTS, SET_SELECTED_PART, RESET_SELECTED_PART, SET_EDITING_PART, RESET_EDITING_PART
} from '../action-types.js';

import formReducer from './formReducer.js';
import { combineReducers } from 'redux';

 /////////////////////////////////////////
/////////////////////////////////////////
const initialDataStatus = 'ok';

const dataReducer = (state = initialDataStatus, action) => {
  if (action.type === SET_DATA_STATUS) {
    return action.payload;
  }
  return state;
};


/* **************************
Modal
************************** */

const initialModalState = ''; // 'newPartForm', 'dataWait, 'dataErr'

const modalReducer = (state = initialModalState, action) => {
  if (action.type === SET_MODAL) {
    return action.payload;
  }
  if (action.type === CLOSE_MODAL) {
    return '';
  }
  return state;
 };

/* **************************
User
************************** */

const initialUserState = {
  hasStravaAccess: false,
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

/* **************************
Bikes
************************** */

const initialBikeState = {
  list: {},
  selectedBike: ''
};

const bikeReducer = (state = initialBikeState, action) => {
  if (action.type === SET_BIKES) {
    return { ...state, list: action.payload };
  }

  if (action.type === SET_SELECTED_BIKE) {
    return { ...state, selectedBike: action.payload };
  }

  if (action.type === RESET_SELECTED_BIKE) {
    return { ...state, selectedBike: initialBikeState.selectedBike }
  }

  return state;
};

/* **************************
Parts
************************** */

const initialPartState = {
  list: {},
  selectedPart: '',
  editingPart: ''
};

const partReducer = (state = initialPartState, action) => {
  if (action.type === SET_PARTS) {
    return { ...state, list: action.payload };
  }

  if (action.type === SET_SELECTED_PART) {
    return { 
      ...state, 
      selectedPart: action.payload === state.selectedPart ? initialPartState.selectedPart : action.payload};
  }

  if (action.type === RESET_SELECTED_PART) {
    return { ...state , selectedPart: initialPartState.selectedPart }
  }
  
  if (action.type === SET_EDITING_PART) {
    return { ...state, editingPart: action.payload};
  }
  if (action.type === RESET_EDITING_PART) {
    return { ...state, editingPart: initialPartState.editingPart };
  }
  return state;
};



export default combineReducers({
  form: formReducer,
  modal: modalReducer,
  user: userReducer, 
  bikes: bikeReducer,
  parts: partReducer,
  dataStatus: dataReducer
});


