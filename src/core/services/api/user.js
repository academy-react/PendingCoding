import { apiCall } from "../interceptor/api-call";

const getProfile = async () => await apiCall.get(`/SharePanel/GetProfileInfo`);

const getUserById = async (id) => apiCall.get(`/User/UserDetails/${id}`);

export { getProfile, getUserById };
