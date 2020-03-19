import { SET_AUTH_STATUS } from './action-types.js';

const initialState = {
  isAuthenticated: false
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_AUTH_STATUS) {
    console.log(action)
    return {...state, isAuthenticated: action.payload}
  }

  return state;
}

export default rootReducer;