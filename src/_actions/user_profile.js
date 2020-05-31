import axios from "axios";
import { GET_PROFILE, UPDATE_PROFILE, GET_PROJECTS_BY_USER_ID } from "./types";

export const getProfile = (id) => {
  const request = axios.get(`/userprofile/${id}`).then((response) => response.data.data);
  return {
    type: GET_PROFILE,
    payload: request,
  };
};

export const editProfile = async (profileData) => {
  const response = await fetch(`/userprofile/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...profileData }),
  });
  const res = await response.json();
  return {
    type: UPDATE_PROFILE,
    payload: res,
  };
};

export const getProjectsByUserId = (id) => {
  const request = axios.get(`/userprofile/getprojects/${id}`).then((response) => response.data.data);
  return {
    type: GET_PROJECTS_BY_USER_ID,
    payload: request,
  };
};
