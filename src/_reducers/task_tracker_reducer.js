import { GET_TASKS, GET_TASK_COMMENTS,GET_PROJECT_COLLABORATORS } from "../_actions/types";

const taskTrackerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case GET_TASK_COMMENTS:
      return { ...state, comments: action.payload };
    case GET_PROJECT_COLLABORATORS:
      return { ...state, collaborators: action.payload };
    default:
      return state;
  }
};

export default taskTrackerReducer;
