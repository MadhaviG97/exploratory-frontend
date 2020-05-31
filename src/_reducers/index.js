import { combineReducers } from "redux";
import user from "./user_reducer";
import project from "./project_reducer";
import forumQuestionReducer from "./forum_question_reducer";
import logged_reducer from "./logged_reducer";
import forum_reducer from "./forum_reducer";
import taskTrackerReducer from "./task_tracker_reducer";
import researcher_Reducer from "./researcher_reducer";
 
const rootReducer = combineReducers({
  user,
  researcher:researcher_Reducer,
  project,
  questions:forumQuestionReducer,
  is_logged:logged_reducer,
  forum:forum_reducer,
  task_tracker:taskTrackerReducer
});

export default rootReducer;
