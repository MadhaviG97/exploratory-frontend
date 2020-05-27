import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  LOGGED_USER,
} from "./types";

export function registerUser(request) {
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`/login`, dataToSubmit)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      return { data: response.data, status: response.status };
    })
    .catch((err) => {
      return { data: err.response.data, status: err.response.status };
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const token = localStorage.token;

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = axios.get(`/auth`, config).then((response) => response.data);
  //if needed handle when token is invalid and add this code
  // if (data.message) {
  // An error will occur if the token is invalid.
  // If this happens, you may want to remove the invalid token.
  //localStorage.removeItem("token")
  //}
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`/logout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
