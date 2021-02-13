import { v4 as uuidv4 } from 'uuid';
import {
  UPDATE_NEW_SUBMIT,
  SET_SUBMIT_ID,
  SET_SUBMIT_MODE,
  UPDATE_CUR_SUBMIT,
  SET_SUBMIT_TO_WATCH,
  SET_CUR_SUBMIT,
  SET_SUBMIT_ERRORS,
  SET_TEMP_UUID,
  CLEAR_CUR_SUBMIT,
  CLEAR_NEW_SUBMIT,
  CLEAR_SUBMIT_TO_WATCH,
} from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_SUBMIT:
      return {
        ...state,
        newSubmit: action.payload,
      };
    case SET_SUBMIT_ID:
      return { ...state, submitUuid: action.payload };
    case SET_SUBMIT_MODE:
      return { ...state, submitMode: action.payload };
    case UPDATE_CUR_SUBMIT:
      return {
        ...state,
        curSubmit: action.payload,
      };
    case SET_CUR_SUBMIT:
      return { ...state, curSubmit: action.payload };
    case SET_SUBMIT_TO_WATCH:
      return {
        ...state,
        submitToWatch: action.payload,
      };
    case SET_SUBMIT_ERRORS:
      return { ...state, submitErrors: action.payload };
    case CLEAR_SUBMIT_TO_WATCH:
      return { ...state, submitToWatch: {}, submitErrors: null };
    case CLEAR_CUR_SUBMIT:
      return { ...state, curSubmit: {}, submitErrors: null };

    case CLEAR_NEW_SUBMIT:
      return { ...state, newSubmit: {}, submitErrors: null };
    case SET_TEMP_UUID:
      return { ...state, tempUuid: uuidv4() };

    default:
      return state;
  }
};
export default reducer;
