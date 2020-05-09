import appControlsReducer from './appControls.js';
import userReducer from './user.js';
import bikeReducer from './bikes.js';
import partReducer from './parts.js';
import formReducer from './form.js';

import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  bikes: bikeReducer,
  parts: partReducer,
  form: formReducer,
  appControls: appControlsReducer
});


