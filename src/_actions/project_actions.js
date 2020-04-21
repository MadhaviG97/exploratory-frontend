import axios from "axios";
import { LOGIN_USER } from "./types";

export function createResearch(dataToSubmit) {
  const request = axios
    .post(`/createProject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
