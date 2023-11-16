import { apiCall } from "../interceptor/api-call";

const getTopCourses = async (count) =>
  await apiCall(`/Home/GetCoursesTop?Count=${count}`);

const getAllCourses = async () =>
  await apiCall("/Home/GetCoursesWithPagination");

const getCourseById = async (id) =>
  await apiCall(`/Home/GetCourseDetails?CourseId=${id}`);

export { getTopCourses, getAllCourses, getCourseById };
