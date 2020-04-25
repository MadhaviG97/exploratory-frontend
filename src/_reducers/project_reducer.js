import { SEARCH, RENDER } from "../_actions/types";
//import { connect } from 'react-redux'

export default function (state = {}, action) {
  var data = action.payload;

  switch (action.type) {
    case SEARCH:
      return { ...state, searchData: data };
    case RENDER:
      return {
        ...state,
        renderData: data.project_details,
        project: data.project_details.project,
        tags: data.project_details.tags,
        collaborators: data.project_details.collaborators,
        images: data.project_details.images,
        admins: data.project_details.admins,
      };
    default:
      return state;
  }
}
