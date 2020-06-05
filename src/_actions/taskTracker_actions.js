import axios from "axios";
import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  GET_TASK_COMMENTS,
  ADD_TASK_COMMENT,
  DELETE_TASK_COMMENT,
  EDIT_TASK_COMMENT,
  GET_PROJECT_COLLABORATORS
} from "./types";

export const getTasks = async (pId) => {
  const response = await fetch(`/project/tasktracker/tasks/${pId}`);
  const data = await response.json();
  const tasks = data.data;
  return {
    type: GET_TASKS,
    payload: tasks,
  };
};

export const addTask = async (taskData) => {
  const response = await fetch(`/project/tasktracker/addtask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...taskData }),
  });
  const res = await response.json();
  console.log(res);
  return {
    type: ADD_TASK,
    payload: taskData,
  };
};

export const getComments = async (pId) => {
  const response = await fetch(`/project/tasktracker/comments/${pId}`);
  const data = await response.json();
  const comments = data.data;
  return {
    type: GET_TASK_COMMENTS,
    payload: comments,
  };
};

export const addComment = async (commentData) => {
  const response = await fetch(`/project/tasktracker/addcomment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...commentData }),
  });
  const res = await response.json();
  console.log(res);
  return {
    type: ADD_TASK_COMMENT,
    payload: commentData,
  };
};

export const deleteTask = async (taskData) => {
  const response = await fetch(`/project/tasktracker/deletetask`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...taskData }),
  });
  const res = await response.json();
  return {
    type: DELETE_TASK,
    payload: res,
  };
};

export const deleteComment = async (commentData) => {
  const response = await fetch(`/project/tasktracker/deletecomment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...commentData }),
  });
  const res = await response.json();
  return {
    type: DELETE_TASK_COMMENT,
    payload: res,
  };
};

export const editTask = async (taskData) => {
  const response = await fetch(`/project/tasktracker/edittask`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...taskData }),
  });
  const res = await response.json();
  return {
    type: EDIT_TASK,
    payload: res,
  };
};

export const editComment = async (commentData) => {
  const response = await fetch(`/project/tasktracker/editcomment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...commentData }),
  });
  const res = await response.json();
  return {
    type: EDIT_TASK_COMMENT,
    payload: res,
  };
};

// export const getCollaborators = (pId) => {
//   const request = axios
//     .get(`/project/tasktracker/collaborators/${pId}`)
//     .then((response) => response.data.data);
//   return {
//     type: GET_PROJECT_COLLABORATORS,
//     payload: request,
//   };
// };

export const getCollaborators = async (pId) => {
  const response = await fetch(`/project/tasktracker/collaborators/${pId}`);
  const data = await response.json();
  const collaborators = data.data;
  return {
    type: GET_PROJECT_COLLABORATORS,
    payload: collaborators,
  };
};

