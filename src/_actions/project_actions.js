import axios from "axios";
import { LOGIN_USER, SEARCH, RENDER, COMMENTS, REPLIES } from "./types";

export function createResearch(request) {
  console.log(request);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function search(dataToSubmit) {
  const request = axios
    .post(`/search`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: SEARCH,
    payload: request,
  };
}

export function render(request) {
  return {
    type: RENDER,
    payload: request,
  };
}

export function getComments(request) {
  return {
    type: COMMENTS,
    payload: request,
  };
}

export function getReplies(request) {
  return {
    type: REPLIES,
    payload: request,
  };
}
