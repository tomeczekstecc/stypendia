import { DELETE_NOTIFICATION, ADD_NOTIFICATION } from '../types';
const reducer= (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:

      return [...state, action.payload];
    case DELETE_NOTIFICATION:
      return state.filter((n) => n.id !== action.payload);
    default:
      return state;
  }
};
export default reducer