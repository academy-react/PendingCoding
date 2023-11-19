import { apiCall } from "../interceptor/api-call";

const getTopCourses = async (count) =>
  await apiCall(`/Home/GetCoursesTop?Count=${count}`);

const getAllCourses = async (params) =>
  await apiCall("/Home/GetCoursesWithPagination", { params });

const getCourseById = async (id) =>
  await apiCall(`/Home/GetCourseDetails?CourseId=${id}`);

const getCourseComments = async (courseId) =>
  await apiCall(`/Course/GetCourseCommnets/${courseId}`);

const likeCourse = async (courseId) => {
  const formData = new FormData();
  formData.append("CourseId", courseId);
  await apiCall.post("/Course/AddCourseLike", formData);
};

const deleteCourseLike = async (course_like_id) => {
  const formData = new FormData();
  formData.append("CourseLikeId", course_like_id);
  await apiCall.delete("/Course/DeleteCourseLike", formData);
};

const likeComment = async (commentId) => {
  const formData = new FormData();
  formData.append("CourseCommandId", commentId);
  await apiCall("/Course/AddCourseCommentLike", formData);
};
const disLikeComment = async (commentId) => {
  const formData = new FormData();
  formData.append("CourseCommandId", commentId);
  await apiCall("/Course/AddCourseCommentDissLike", formData);
};

const replyComment = async (body) => {
  const formData = new FormData();
  for (const attr in body) formData.append(attr, body[attr]);
  await apiCall("/Course/AddReplyCourseComment", formData);
};

const getCommentReplies = async (courseId, commentId) =>
  await apiCall(`/Course/GetCourseReplyCommnets/${courseId}/${commentId}`);

export {
  getTopCourses,
  getAllCourses,
  getCourseById,
  likeCourse,
  deleteCourseLike,
  getCourseComments,
  likeComment,
  disLikeComment,
  replyComment,
  getCommentReplies,
};
