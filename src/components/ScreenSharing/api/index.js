import axios from "axios";

const token = localStorage.token;
let config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
  }
export const getToken = async user =>
  axios.get("/screenshare/token",config, {
    params: {
      user
    }
  });
