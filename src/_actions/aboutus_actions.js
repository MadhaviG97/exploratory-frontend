import { ADD_MESSAGE } from "./types";

export const addMessage = async (messageData) => {
    const response = await fetch(`/aboutus/addmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...messageData }),
    });
    const res = await response.json();
    return res.success;
  };