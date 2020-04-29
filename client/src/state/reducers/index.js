import { modalReducer, dataReducer } from './app.js';
import userReducer from './user.js';
import bikeReducer from './bikes.js';
import partReducer from './parts.js';
import formReducer from './form.js';

import { combineReducers } from 'redux';

export default combineReducers({
  dataStatus: dataReducer,
  modal: modalReducer,
  user: userReducer,
  bikes: bikeReducer,
  parts: partReducer,
  form: formReducer
});


