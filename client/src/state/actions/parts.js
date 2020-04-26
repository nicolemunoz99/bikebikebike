import {
  SET_PARTS, 
  SET_SELECTED_PART, 
  RESET_SELECTED_PART, 
  SET_EDITING_PART,
  RESET_EDITING_PART, 
  SET_DEFAULT_PARTS
} from '../action-types/';


export const setParts = (parts) => {
  return { type: SET_PARTS, payload: parts };
};

export const setSelectedPart = (partId) => {
  return { type: SET_SELECTED_PART, payload: partId };
};

export const resetSelectedPart = () => {
  return { type: RESET_SELECTED_PART };
};

export const setEditingPart = (partId) => {
  return { type: SET_EDITING_PART, payload: partId };
};

export const resetEditingPart = () => {
  return { type: RESET_EDITING_PART };
};

export const setDefaultParts = (defaultValues) => {
  return { type: SET_DEFAULT_PARTS, payload: defaultValues};
};