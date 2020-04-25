import axios from "axios";
import { LOGIN_USER, SEARCH, RENDER } from "./types";

export function createResearch(dataToSubmit) {
  console.log(dataToSubmit);
  const request = axios
    .post(`/project/create-project`, dataToSubmit)
    .then((response) => response.data);
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
