import { SET_USER, LOGOUT_USER, CHECK_IS_LOGGED_IN, RESET_TIME_LEFT, SET_TIME} from '../types';

 const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    case CHECK_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case RESET_TIME_LEFT:
      return { ...state, timeLeft: +process.env.REACT_APP_SESSION_TIMEOUT };
    case SET_TIME:
      return { ...state, timeLeft: action.payload };

    default:
      return state;
  }
};
export default reducer