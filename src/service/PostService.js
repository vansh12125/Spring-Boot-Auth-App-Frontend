import { apiClient } from "@/config";

const createPost = async (postData) => {
  return await apiClient.post("/posts/post", postData);
};

const getPost = async (postId) => {
  return await apiClient.get(`/posts/post/${postId}`);
};

const getAllPost = async () => {
  return await apiClient.get("/posts");
};

const getAllPostByUser = async (userId) => {
  return await apiClient.get(`/posts/post/${userId}`);
};

const likePost = async (postId, userId) => {
  return await apiClient.post(`/posts/post/${postId}/like/${userId}`);
};
const unLikePost = async (postId, userId) => {
  return await apiClient.post(`/posts/post/${postId}/unlike/${userId}`);
};

export {
  createPost,
  getPost,
  getAllPost,
  getAllPostByUser,
  likePost,
  unLikePost,
};
