import { apiCall } from "./api-call";

const getCourses = (endpoint) => {
  return apiCall(endpoint);
};

export { getCourses };
