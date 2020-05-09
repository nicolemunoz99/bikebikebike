import{
  SET_DATA_STATUS,
  OPEN_MODAL, CLOSE_MODAL,
  SET_REDIRECT_ROUTE, RESET_REDIRECT_ROUTE
} from '../action-types/';



 const initialAppState = {
  modal: {
    newPartForm: false,
    editPartForm: false,
    dataWait: false,
    err: false
  },
  redirectRoute: '/bikes'
 }

const appControlsReducer = (state = initialAppState, action) => {
  // ... data status ...
  // if (action.type === SET_DATA_STATUS) {
  //   return { ...state, dataStatus: action.payload };
  // }

  // ... modals ...
  if (action.type === OPEN_MODAL) {
    return { ...state, modal: { ...state.modal, [action.modalName]: true} };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, modal: { ...state.modal, [action.modalName]: false} };
  }

  // ... redirect ...
  if (action.type === SET_REDIRECT_ROUTE) {
    return { ...state, redirectRoute: action.redirectRoute };
  }

  if (action.type === RESET_REDIRECT_ROUTE) {
    return { ...state, redirectRoute: initialAppState.redirectRoute };
  }


  return state;
};


 export default appControlsReducer;
