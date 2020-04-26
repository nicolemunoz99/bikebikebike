import {
  SET_STRAVA_ACCESS_STATUS,
  SET_USER
} from '../action-types/'

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

export default userReducer;