import { apiCall } from "../interceptor/api-call";

const getCourseComments = async (courseId) =>
  await apiCall(`/Course/GetCourseCommnets/${courseId}`);

const likeComment = async (courseId) => {
  const formData = new FormData();
  formData.append("CourseCommandId", courseId);
  await apiCall("/Course/AddCourseCommentLike", formData);
};

const replyComment = async (body) => {
  const formData = new FormData();
  for (const attr in body) formData.append(attr, body[attr]);
  await apiCall("/Course/AddReplyCourseComment", formData);
};

export { getCourseComments, likeComment, replyComment };
