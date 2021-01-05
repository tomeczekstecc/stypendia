import { UPDATE_CURRENT_SUBMIT } from '../types';

 const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_SUBMIT:
      return { currentSubmit: action.payload };


    default:
      return state;
  }
};
export default reducer