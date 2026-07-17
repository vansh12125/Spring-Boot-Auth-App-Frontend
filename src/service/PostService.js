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
  return await apiClient.get(`/posts/post/user/${userId}`);
};

const likePost = async (postId, userId) => {
  return await apiClient.post(`/posts/post/${postId}/like/${userId}`);
};

const unLikePost = async (postId, userId) => {
  return await apiClient.post(`/posts/post/${postId}/unlike/${userId}`);
};

const deletePost = async (postId, userId) => {
  return await apiClient.delete(`/posts/post/${postId}/user/${userId}`);
};

const getPostByIdAndValidateUser = async(postId, userId)=>{
  return await apiClient.get(`/posts/post/${postId}/user/${userId}`);
}

const updatePost=async(postId,userId,postData)=>{
  return await apiClient.patch(`/posts/post/${postId}/user/${userId}`,postData);
}

export {
  createPost,
  getPost,
  getAllPost,
  getAllPostByUser,
  likePost,
  unLikePost,
  deletePost,
  getPostByIdAndValidateUser,
  updatePost,
};
