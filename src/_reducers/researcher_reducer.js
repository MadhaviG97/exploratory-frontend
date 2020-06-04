import { GET_PROFILE, GET_PROJECTS_BY_USER_ID, GET_INSTITUTIONS } from "../_actions/types";

const researcher_Reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, researcherData: action.payload };
    case GET_PROJECTS_BY_USER_ID:
      return { ...state, projects: action.payload };
    case GET_INSTITUTIONS:
      return { ...state, institutions: action.payload };
    default:
      return state;
  }
};
export default researcher_Reducer;
