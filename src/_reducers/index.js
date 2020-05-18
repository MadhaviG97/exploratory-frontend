import { combineReducers } from "redux";
import user from "./user_reducer";
import project from "./project_reducer";
import forumQuestionReducer from "./forum_question_reducer";
import logged_reducer from "./logged_reducer";
import forum_reducer from "./forum_reducer";
 
const rootReducer = combineReducers({
  user,
  project,
  questions:forumQuestionReducer,
  is_logged:logged_reducer,
  forum:forum_reducer,
});

export default rootReducer;
