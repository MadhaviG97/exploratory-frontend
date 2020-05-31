import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  SEARCH,
} from "../_actions/types";
//import { connect } from 'react-redux'

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case SEARCH:
      return { ...state, searchData: action.payload };
    case LOGOUT_USER:
      return { ...state, userData: {} };
    default:
      return state;
  }
}
