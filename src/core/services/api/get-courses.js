import { apiCall } from "../interceptor/api-call";

const getCourses = async (count) =>
  await apiCall(`/Home/GetCoursesTop?Count=${count}`);

const getCoursesByPagination = async (rowsPerPage = 6) =>
  await apiCall(
    `/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=${rowsPerPage}&SortingCol=Active&SortType=DESC&TechCount=0`
  );

const getCourseById = async (id) =>
  await apiCall(`/Home/GetCourseDetails?CourseId=${id}`);

export { getCourses, getCoursesByPagination, getCourseById };
