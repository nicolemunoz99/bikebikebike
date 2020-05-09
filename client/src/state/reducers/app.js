import{
  SET_DATA_STATUS,
  SET_MODAL,
  CLOSE_MODAL,
  SET_REDIRECT_ROUTE
} from '../action-types/';



 const initialAppState = {
  dataStatus: 'ok',
  modal: '',
  redirectRoute: '/bikes'
 }

const appReducer = (state = initialAppState, action) => {
  // ... data status ...
  if (action.type === SET_DATA_STATUS) {
    return { ...state, dataStatus: action.payload };
  }

  // ... modals ...
  if (action.type === SET_MODAL) {
    return { ...state, modal: action.payload };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, modal: initialAppState.modal};
  }

  // ... redirect ...
  if (action.type === SET_REDIRECT_ROUTE) {
    return { ...state, redirectRoute: action.redirectRoute };
  }

  return state;
};


 export default appReducer;
