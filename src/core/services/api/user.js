import { apiCall } from "../interceptor/api-call";

const getUserProfile = async () => await apiCall("/SharePanel/GetProfileInfo");

const getUserById = async (id) => apiCall(`/User/UserDetails/${id}`);

const reserveCourse = async (courseId) => {
  const body = {
    courseId,
  };
  return await apiCall.post("/CourseReserve/ReserveAdd", body);
};
const deleteReservedCourse = async (reserveId) => {
  return await apiCall.delete("/CourseReserve", { data: { id: reserveId } });
};

export { getUserProfile, getUserById, reserveCourse, deleteReservedCourse };
