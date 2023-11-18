import { apiCall } from "../interceptor/api-call";

const getAllBlogs = async () => await apiCall("/News");

const getBlogById = async (id) => await apiCall(`/News/${id}`);

const getBlogComments = async (id) =>
  await apiCall(`/News/GetNewsComments?NewsId=${id}`);

const getCommentReplies = async (id) =>
  await apiCall(`/News/GetRepliesComments?Id=${id}`);

const likeComment = async (commentId) =>
  await apiCall.post(`/News/CommentLike/${commentId}?LikeType=true`);

const replyComment = async (body) => {
  await apiCall.post(`/News/CreateNewsReplyComment`, body);
};

export {
  getAllBlogs,
  getBlogById,
  getBlogComments,
  getCommentReplies,
  likeComment,
  replyComment,
};
