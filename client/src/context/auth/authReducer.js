import { SET_USER, LOGOUT_USER, CHECK_IS_LOGGED_IN } from '../types';

 const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    case CHECK_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };

    default:
      return state;
  }
};
export default reducer