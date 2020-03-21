import { SET_AUTH_STATUS, SET_STRAVA_ACCESS_STATUS, SET_USERNAME } from './action-types.js';

const initialState = {
  username: '',
  isAuthenticated: false,
  hasStravaAccess: false
};

function rootReducer(state = initialState, action) {
  
  if (action.type === SET_AUTH_STATUS) {
    return {...state, isAuthenticated: action.payload};
  }

  if (action.type === SET_STRAVA_ACCESS_STATUS) {
    return {...state, hasStravaAccess: action.payload};
  }

  if (action.type === SET_USERNAME) {
    return{...state, username: action.payload};
  }

  return state;
}

export default rootReducer;