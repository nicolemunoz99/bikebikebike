import {
  OPEN_MODAL, CLOSE_MODAL,
  LOG_ERR, CLEAR_ERRS,
  SET_REDIRECT_ROUTE, RESET_REDIRECT_ROUTE,
  DESTROY_SESSION
} from '../action-types/';



export const openModal = (modalName) => {
  return { type: OPEN_MODAL, modalName };
};
export const closeModal = (modalName) => {
  return { type: CLOSE_MODAL, modalName };
};

export const logErr = (error) => {
  return { type: LOG_ERR, payload: error};
};

export const clearErrs = () => {
  return { type: CLEAR_ERRS };
};

export const setRedirectRoute = (redirectRoute) => {
  return { type: SET_REDIRECT_ROUTE, redirectRoute};
};

export const resetRedirectRoute = () => {
  return { type: RESET_REDIRECT_ROUTE };
};

export const destroySession = () => {
  return { type: DESTROY_SESSION };
};