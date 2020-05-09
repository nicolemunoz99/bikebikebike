import {
  SET_AUTH_STATE,
  SET_STRAVA_ACCESS_STATUS,
  SET_USER
} from '../action-types/'

const initialUserState = {
  id: null,
  measure_pref: '',
  last_login_date: '',
  join_date: '',
  bikes: [],
  authState: '',
  hasStravaAccess: false
};

const userReducer = (state = initialUserState, action) => {
  
  if (action.type === SET_STRAVA_ACCESS_STATUS) {
    return { ...state, hasStravaAccess: action.payload };
  }

  if (action.type === SET_USER) {
    return {...state, ...action.payload};
  }

  if (action.type === SET_AUTH_STATE) {
    return { ...state, authState: action.authState };
  }

  return state;
};

export default userReducer;