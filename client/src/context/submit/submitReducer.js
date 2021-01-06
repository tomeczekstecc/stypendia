import { UPDATE_CURRENT_SUBMIT, SET_SUBMIT_ID } from '../types';

 const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_SUBMIT:
      return { currentSubmit: action.payload };
    case SET_SUBMIT_ID:
      return { submitId: action.payload };

    default:
      return state;
  }
};
export default reducer