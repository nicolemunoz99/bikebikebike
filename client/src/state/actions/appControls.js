import {
  SET_DATA_STATUS, 
  OPEN_MODAL, CLOSE_MODAL,
  SET_REDIRECT_ROUTE, RESET_REDIRECT_ROUTE,
} from '../action-types/';


export const setDataStatus = (str) => {
  return { type: SET_DATA_STATUS, payload: str }
};

export const openModal = (modalName) => {
  return { type: OPEN_MODAL, modalName };
};
export const closeModal = (modalName) => {
  return { type: CLOSE_MODAL, modalName };
};

export const setRedirectRoute = (redirectRoute) => {
  return { type: SET_REDIRECT_ROUTE, redirectRoute};
};

export const resetRedirectRoute = () => {
  return { type: RESET_REDIRECT_ROUTE };
};

/********
thunks
********/

export const updateDataStatus = (str) => (dispatch) => {
  dispatch(setDataStatus(str));
  if (str === 'ok') dispatch(closeModal('dataWait'));
  // else dispatch(openModal('dataErr'));
};