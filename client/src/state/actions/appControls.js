import {
  OPEN_MODAL, CLOSE_MODAL,
  SET_REDIRECT_ROUTE, RESET_REDIRECT_ROUTE,
  DESTROY_SESSION
} from '../action-types/';



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

export const destroySession = () => {
  return { type: DESTROY_SESSION };
};