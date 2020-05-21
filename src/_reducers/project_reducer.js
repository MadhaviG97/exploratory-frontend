import {
  SEARCH,
  RENDER,
  COMMENTS,
  REPLIES,
  FINALPAPER,
  RELATEDIMAGES,
  PUBLICFILES,
} from "../_actions/types";
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
        // images: data.project_details.images,
        admins: data.project_details.admins,
        comments: data.project_details.comments,
      };

    case COMMENTS:
      return {
        ...state,
        comments: data,
      };

    case REPLIES:
      return {
        ...state,
        replies: data,
      };

    case RELATEDIMAGES:
      return {
        ...state,
        related_images: data.files,
      };

    case FINALPAPER:
      return {
        ...state,
        final_paper: data.files,
      };

    case PUBLICFILES:
      return {
        ...state,
        public_files: data.files,
      };
    default:
      return state;
  }
}
