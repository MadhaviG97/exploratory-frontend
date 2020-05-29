import {
  GET_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER,
  GET_ANSWERS,
  EDIT_QUESTION,
  DELETE_QUESTION,
  LIKE_QUESTION,
  EDIT_ANSWER,
  DELETE_ANSWER,
  LIKE_ANSWER,
  GET_FORUM_USERS,
  GET_FREQ_USERS,
  GET_POPULAR_QUESTIONS,
  GET_POPULAR_ANSWERS,
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

export const getForumUsers = async () => {
  const response = await fetch(`/forum/users`);
  const data = await response.json();
  const forumUsers = data.data;
  return {
    type: GET_FORUM_USERS,
    payload: forumUsers,
  };
};

export const getFreqUsers = async () => {
  const response = await fetch(`/forum/frequsers`);
  const data = await response.json();
  const freqUsers = data.data;
  return {
    type: GET_FREQ_USERS,
    payload: freqUsers,
  };
};

export const getPopularQuestions = async () => {
  const response = await fetch(`/forum/popularquestions`);
  const data = await response.json();
  const popularQuestions = data.data;
  return {
    type: GET_POPULAR_QUESTIONS,
    payload: popularQuestions,
  };
};

export const getPopularAnswers = async () => {
  const response = await fetch(`/forum/popularanswers`);
  const data = await response.json();
  const popularAnswers = data.data;
  return {
    type: GET_POPULAR_ANSWERS,
    payload: popularAnswers,
  };
};

export const likeQuestion = async (questionData) => {
  const response = await fetch(`/forum/likequestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...questionData }),
  });
  const res = await response.json();
  return {
    type: LIKE_QUESTION,
    payload: res,
  };
};

export const likeAnswer = async (answerData) => {
  const response = await fetch(`/forum/likeanswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...answerData }),
  });
  const res = await response.json();
  return {
    type: LIKE_ANSWER,
    payload: res,
  };
};
