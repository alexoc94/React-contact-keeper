import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];/*... state is a copy of the state set in alertState
      action.payload is the particular alert that gets sent*/
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);//were filtering out the correct alert, will happen after 5 seconds
    default:
      return state;
  }
};
