import { ADD_ANSWER, GET_ANSWERS } from "../_actions/types";

const forumReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ANSWERS:
        return { ...state, answers: action.payload };
      default:
        return state;
    }
  };
  
  export default forumReducer;