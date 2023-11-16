import { apiCall } from "../interceptor/api-call";

const getAllBlogs = async () => await apiCall("/News");

const getBlogById = async (id) => await apiCall(`/News/${id}`);

const getBlogComments = async (id) =>
  await apiCall(`/News/GetNewsComments?NewsId=${id}`);

export { getAllBlogs, getBlogById, getBlogComments };
