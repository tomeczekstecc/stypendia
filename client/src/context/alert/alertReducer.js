import { DELETE_NOTIFICATION, ADD_NOTIFICATION } from '../types';
export default (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      console.log(state, action.payload);
      return [...state, action.payload];
    case DELETE_NOTIFICATION:
      return state.filter((n) => n.id !== action.payload);
    default:
      return state;
  }
};
