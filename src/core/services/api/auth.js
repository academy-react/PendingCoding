import http from "../my-interceptor/index";

export const loginAPI = async (user) => {
  try {
    const response = await http.post("/Sign/Login", user);

    return response;
  } catch (error) {
    return false;
  }
};
