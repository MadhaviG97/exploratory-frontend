import { combineReducers } from "redux";
import user from "./user_reducer";
import project from "./project_reducer";

const rootReducer = combineReducers({
  user,
  project,
});

export default rootReducer;
