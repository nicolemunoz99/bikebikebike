import {
  SET_DATA_STATUS, SET_MODAL, CLOSE_MODAL
} from '../action-types/';



export const setDataStatus = (str) => {
  return { type: SET_DATA_STATUS, payload: str }
};

export const setModal = (modalType) => {
  return { type: SET_MODAL, payload: modalType };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

/********
thunks
********/

export const updateDataStatus = (str) => (dispatch) => {
  dispatch(setDataStatus(str));
  if (str === 'ok') dispatch(closeModal());
  else dispatch(setModal(str));
};