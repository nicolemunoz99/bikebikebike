import { ACTION } from './action-types.js';

export const action = (payload) => {
  return { type: ACTION, payload }
};

