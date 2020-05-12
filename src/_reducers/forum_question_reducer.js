import { ADD_QUESTION, GET_QUESTIONS } from "../_actions/types";

const forumQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.payload };
    case ADD_QUESTION:
      return { ...state,
        questions: [ ...state.questions, {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          Q_created_at: action.payload.created_at,
          category_name: action.payload.category_name,
          question_id:action.payload.question_id,
          title: action.payload.title,
          description: action.payload.description,
          profile_picture: action.payload.profile_picture
        }]
    };
    default:
      return state;
  }
};

export default forumQuestionReducer;
