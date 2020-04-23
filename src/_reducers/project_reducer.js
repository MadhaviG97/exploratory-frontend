import { SEARCH } from "../_actions/types";
//import { connect } from 'react-redux'

export default function (state = {}, action) {
  switch (action.type) {
    case SEARCH:
      return { ...state, searchData: action.payload };
    default:
      return state;
  }
}
