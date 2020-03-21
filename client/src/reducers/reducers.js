import { SET_STRAVA_ACCESS_STATUS, SET_USER_DATA } from './action-types.js';

const initialState = {
  hasStravaAccess: true,
  userData: {}
};

function rootReducer(state = initialState, action) {
  
  if (action.type === SET_STRAVA_ACCESS_STATUS) {
    return { ...state, hasStravaAccess: action.payload };
  }

  if (action.type === SET_USER_DATA) {
    return { ...state, userData: action.payload };
  }

  return state;
}

export default rootReducer;