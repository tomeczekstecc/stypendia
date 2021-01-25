import {
  UPDATE_NEW_SUBMIT,
  SET_SUBMIT_ID,
  SET_SUBMIT_MODE,
  UPDATE_CUR_SUBMIT,
  SET_SUBMIT_TO_WATCH,
  SET_CUR_SUBMIT,
  SET_SUBMIT_ERRORS,
} from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_SUBMIT:
      return { ...state, newSubmit: action.payload };
    case SET_SUBMIT_ID:
      return { ...state, submitUuid: action.payload };
    case SET_SUBMIT_MODE:
      return { ...state, submitMode: action.payload };
    case UPDATE_CUR_SUBMIT:
      return { ...state, curSubmit: action.payload };
    case SET_CUR_SUBMIT:
      return { ...state, curSubmit: action.payload };
    case SET_SUBMIT_TO_WATCH:
      return { ...state, submitToWatch: action.payload };
    case SET_SUBMIT_ERRORS:
      return { ...state, submitErrors: action.payload };

    default:
      return state;
  }
};
export default reducer;
