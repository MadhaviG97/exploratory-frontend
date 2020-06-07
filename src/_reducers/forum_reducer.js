import {
  GET_FORUM_USERS,
  GET_ANSWERS,
  GET_FREQ_USERS,
  GET_POPULAR_QUESTIONS,
  GET_POPULAR_ANSWERS,
  FORUM_SEARCH,
  GET_QUESTION_LIKES,
  GET_ANSWER_LIKES,
} from "../_actions/types";

const forumReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      return { ...state, answers: action.payload };
    case GET_FORUM_USERS:
      return { ...state, users: action.payload };
    case GET_FREQ_USERS:
      return { ...state, freqUsers: action.payload };
    case GET_POPULAR_QUESTIONS:
      return { ...state, popularQuestions: action.payload };
    case GET_POPULAR_ANSWERS:
      return { ...state, popularAnswers: action.payload };
    case FORUM_SEARCH:
      return { ...state, searchData: action.payload };
    case GET_QUESTION_LIKES:
      return { ...state, questionLikes: action.payload };
    case GET_ANSWER_LIKES:
      return { ...state, answerLikes: action.payload };
    default:
      return state;
  }
};

export default forumReducer;
