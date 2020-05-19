import { UPDATE_PROFILE } from "./types";

export const updateProfile = async (profileData) => {
  const response = await fetch(`/userProfile/updateProfile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...profileData }),
  });
  const res = await response.json();
  return res.success;
};
