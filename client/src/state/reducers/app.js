import{
  SET_DATA_STATUS,
  SET_MODAL,
  CLOSE_MODAL
} from '../action-types/';

import { combineReducers } from 'redux';


const initialDataStatus = 'ok';

export const dataReducer = (state = initialDataStatus, action) => {
  if (action.type === SET_DATA_STATUS) {
    return action.payload;
  }
  return state;
};

const initialModalState = ''; // 'newPartForm', 'dataWait, 'dataErr'

export const modalReducer = (state = initialModalState, action) => {
  if (action.type === SET_MODAL) {
    return action.payload;
  }
  if (action.type === CLOSE_MODAL) {
    return '';
  }
  return state;
 };
