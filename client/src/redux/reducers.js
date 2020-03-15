import { ACTION } from './action-types.js';

const initialState = {
  var: ''
};

function rootReducer(state = initialState, action) {
  if (action.type === ACTION) {
    console.log('action.payload', action.payload)
    return {...state, style: action.payload}
  }
  return state;
}

export default rootReducer;