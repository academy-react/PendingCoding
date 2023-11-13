import { apiCall } from "../interceptor/api-call";

const getAllTeachers = async () => await apiCall("/Home/GetTeachers");

export { getAllTeachers };
