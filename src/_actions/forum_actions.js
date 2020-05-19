import {
  GET_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER,
  GET_ANSWERS,
  EDIT_QUESTION,
  DELETE_QUESTION,
  RATE_QUESTION,
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
