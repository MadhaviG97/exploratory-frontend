import { ADD_QUESTION, GET_QUESTIONS } from "../_actions/types";

const forumQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

export default forumQuestionReducer;
