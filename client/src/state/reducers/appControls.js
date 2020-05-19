import{
  OPEN_MODAL, CLOSE_MODAL,
  LOG_ERR, CLEAR_ERRS,
  SET_REDIRECT_ROUTE, RESET_REDIRECT_ROUTE
} from '../action-types/';



 const initialAppState = {
  modal: {
    newPartForm: false,
    editPartForm: false,
    dataWait: false,
    err: false,
    confirmRetire: false,
    confirmService: false,
    limitedAccess: false
  },
  redirectRoute: '/bikes',
  errs: []
 }

const appControlsReducer = (state = initialAppState, action) => {

  // ... modals ...
  if (action.type === OPEN_MODAL) {
    return { ...state, modal: { ...state.modal, [action.modalName]: true} };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, modal: { ...state.modal, [action.modalName]: false} };
  }

  // ... log errors ...
  if (action.type === LOG_ERR) {
    return { ...state, errs: [ ...state.errs, action.payload ]};
  }
  if (action.type === CLEAR_ERRS) {
    return { ...state, errs: initialAppState.errs };
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
