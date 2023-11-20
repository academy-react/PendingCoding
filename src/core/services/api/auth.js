import {apiCall} from "../interceptor/api-call";

export const loginAPI = async (user) => {
  try {
    const response = await apiCall.post("/Sign/Login", user);

    return response;
  } catch (error) {
    return false;
  }
};
