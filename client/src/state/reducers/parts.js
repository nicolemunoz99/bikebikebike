import {
  SET_PARTS, 
  SET_DEFAULT_PARTS,
  SET_SELECTED_PART, 
  RESET_SELECTED_PART, 
  SET_EDITING_PART, 
  RESET_EDITING_PART,
  SET_PARTS_TO_SORT
} from '../action-types/';

const initialPartState = {
  list: {},
  selectedPart: '',
  editingPart: '',
  default: {},
  toSort: []
};

const partReducer = (state = initialPartState, action) => {
  if (action.type === SET_PARTS) {
    return { ...state, list: action.payload };
  }

  if (action.type === SET_SELECTED_PART) {
    return { 
      ...state, 
      selectedPart: action.payload === state.selectedPart ? initialPartState.selectedPart : action.payload};
  }

  if (action.type === RESET_SELECTED_PART) {
    return { ...state , selectedPart: initialPartState.selectedPart }
  }
  
  if (action.type === SET_EDITING_PART) {
    return { ...state, editingPart: action.payload};
  }

  if (action.type === RESET_EDITING_PART) {
    return { ...state, editingPart: initialPartState.editingPart };
  }

  if (action.type === SET_DEFAULT_PARTS) {
    return { ...state, default: action.payload };
  }

  if (action.type === SET_PARTS_TO_SORT) {
    return { ...state, toSort: action.partIds}
  }

  return state;
};

export default partReducer;