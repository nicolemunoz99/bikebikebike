import {
  SET_BIKES, 
  SET_SELECTED_BIKE, 
  RESET_SELECTED_BIKE
} from '../action-types/';

const initialBikeState = {
  list: {},
  selectedBike: ''
};

const bikeReducer = (state = initialBikeState, action) => {
  if (action.type === SET_BIKES) {
    return { ...state, list: action.payload };
  }

  if (action.type === SET_SELECTED_BIKE) {
    return { ...state, selectedBike: action.payload };
  }

  if (action.type === RESET_SELECTED_BIKE) {
    return { ...state, selectedBike: initialBikeState.selectedBike }
  }

  return state;
};

export default bikeReducer;