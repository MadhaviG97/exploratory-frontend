import { GET_TASKS, GET_TASK_COMMENTS } from "../_actions/types";

const taskTrackerReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_TASKS:
        return { ...state, tasks: action.payload };
      case GET_TASK_COMMENTS:
        return { ...state, comments: action.payload };
      default:
        return state;
    }
  };
  
  export default taskTrackerReducer;