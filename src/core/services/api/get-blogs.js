import { apiCall } from "../interceptor/api-call";

const getAllBlogs = async () =>
  await apiCall(
    `/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC`
  );

const getBlogById = async (id) => await apiCall(`/News/${id}`);

const getBlogComments = async (id) =>
  await apiCall(`/News/GetNewsComments?NewsId=${id}`);

export { getAllBlogs, getBlogById, getBlogComments };
