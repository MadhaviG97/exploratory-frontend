import { GET_FORUM_USERS, GET_ANSWERS } from "../_actions/types";

const forumReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ANSWERS:
        return { ...state, answers: action.payload };
      case GET_FORUM_USERS:
        return {...state, users: action.payload}
      default:
        return state;
    }
  };
  
  export default forumReducer;