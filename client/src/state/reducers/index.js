import appControlsReducer from './appControls.js';
import userReducer from './user.js';
import bikeReducer from './bikes.js';
import partReducer from './parts.js';
import formReducer from './form.js';

import { DESTROY_SESSION } from '../action-types/';;

import { combineReducers } from 'redux';

const bikeBikeBikeReducer = combineReducers({
  user: userReducer,
  bikes: bikeReducer,
  parts: partReducer,
  form: formReducer,
  appControls: appControlsReducer
});

const rootReducer = (state, action) => {
  // reset state on logout
  if (action.type === DESTROY_SESSION) state = undefined;
  
  return bikeBikeBikeReducer(state, action);
};

export default rootReducer;


