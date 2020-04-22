import axios from "axios";
import { LOGIN_USER } from "./types";

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
