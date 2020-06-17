import axios from "axios";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_PROJECTS_BY_USER_ID,
  GET_PROJECT_POSTS_BY_USER_ID,
  GET_INSTITUTIONS,
  EDIT_PROFILE_PICTURE,
} from "./types";

export const getProfile = (id) => {
  const request = axios
    .get(`/userprofile/${id}`)
    .then((response) => response.data.data);
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

export const editProfilePicture = async (profileData) => {
  const response = await fetch(`/userprofile/edit/profilepicture`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...profileData }),
  });
  const res = await response.json();
  return {
    type: EDIT_PROFILE_PICTURE,
    payload: profileData.url,
  };
};

export const getProjectsByUserId = async (uId) => {
  const response = await fetch(`/userprofile/projects/${uId}`);
  const data = await response.json();
  const projects = data.data;
  return {
    type: GET_PROJECTS_BY_USER_ID,
    payload: projects,
  };
};

export const getInstitutions = async () => {
  const response = await fetch(`/userprofile/edit/institutions`);
  const data = await response.json();
  const institutions = data.data;
  return {
    type: GET_INSTITUTIONS,
    payload: institutions,
  };
};

export const getProjectPostsByUserId = async (uId) => {
  const response = await fetch(`/userprofile/projects/posts/${uId}`);
  const data = await response.json();
  const projects = data.data;
  return {
    type: GET_PROJECT_POSTS_BY_USER_ID,
    payload: projects,
  };
};
