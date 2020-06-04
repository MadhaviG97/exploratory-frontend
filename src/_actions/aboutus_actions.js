import { ADD_MESSAGE } from "./types";
import axios from "axios";

// export const addMessage = async (messageData) => {
//   const response = await fetch(`/aboutus/addmessage`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ ...messageData }),
//   });
//   const res = await response.json();
//   return res.success;
// };

export function addMessage(messageData) {
  const request = axios
    .post(`/aboutus/addmessage`, messageData)
    .then((response) =>{
      return response;
    } );
}
