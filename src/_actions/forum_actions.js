import {
  GET_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER,
  GET_ANSWERS,
  EDIT_QUESTION,
  DELETE_QUESTION,
  RATE_QUESTION,
  EDIT_ANSWER,
  DELETE_ANSWER,
  RATE_ANSWER
} from "./types";

export const getQuestions = async () => {
  const response = await fetch(`/forum/questions`);
  const data = await response.json();
  const questions = data.data;
  return {
    type: GET_QUESTIONS,
    payload: questions,
  };
};

export const addQuestion = async (questionData) => {
  const response = await fetch(`/forum/addquestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...questionData }),
  });
  const res = await response.json();
  console.log(res);
  return {
    type: ADD_QUESTION,
    payload: questionData,
  };
};

export const getAnswers = async () => {
  const response = await fetch(`/forum/answers`);
  const data = await response.json();
  const answers = data.data;
  return {
    type: GET_ANSWERS,
    payload: answers,
  };
};

export const addAnswer = async (answerData) => {
  const response = await fetch(`/forum/addanswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...answerData }),
  });
  const res = await response.json();
  console.log(res);
  return {
    type: ADD_ANSWER,
    payload: answerData,
  };
};

export const deleteQuestion = async (questionData) => {
  const response = await fetch(`/forum/deletequestion`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...questionData }),
  });
  const res = await response.json();
  return {
    type: DELETE_QUESTION,
    payload: res,
  };
};

export const deleteAnswer = async (answerData) => {
  const response = await fetch(`/forum/deleteanswer`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...answerData }),
  });
  const res = await response.json();
  return {
    type: DELETE_ANSWER,
    payload: res,
  };
};

export const editQuestion = async (questionData) => {
  const response = await fetch(`/forum/editquestion`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...questionData }),
  });
  const res = await response.json();
  return {
    type: EDIT_QUESTION,
    payload: res,
  };
};

export const editAnswer = async (answerData) => {
  const response = await fetch(`/forum/editanswer`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...answerData }),
  });
  const res = await response.json();
  return {
    type: EDIT_ANSWER,
    payload: res,
  };
};