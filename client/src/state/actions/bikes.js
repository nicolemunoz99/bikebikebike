import {
  SET_BIKES, SET_SELECTED_BIKE, RESET_SELECTED_BIKE
} from '../action-types/';

export const setBikes = (bikes) => {
  return { type: SET_BIKES, payload: bikes };
};

export const setSelectedBike = (bikeId) => {
  return { type: SET_SELECTED_BIKE, payload: bikeId };
};

export const resetSelectedBike = () => {
  return { type: RESET_SELECTED_BIKE };
};
