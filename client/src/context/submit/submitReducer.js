import { UPDATE_NEW_SUBMIT, SET_SUBMIT_ID } from '../types';

 const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_SUBMIT:
      return { newSubmit: action.payload };
    case SET_SUBMIT_ID:
      return { submitId: action.payload };

    default:
      return state;
  }
};
export default reducer