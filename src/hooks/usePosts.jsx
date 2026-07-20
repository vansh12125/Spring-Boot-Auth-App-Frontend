import { useDispatch, useSelector } from "react-redux";
import { loadPost, addPost, removePost, updatePost } from "@/redux";
import {
  getAllPostByUser,
  createPost,
  deletePost,
  updatePost as updatePostApi,
} from "@/service";

export default function usePosts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);

  const fetchPosts = async (userId) => {
    const response = await getAllPostByUser(userId);
    dispatch(
      loadPost({
        posts: response.data,
      }),
    );

    return response;
  };

  const createNewPost = async (data) => {
    const response = await createPost(data);
    // console.log("added" + response);
    

    dispatch(addPost(response.data.post));

    return response;
  };

  const deleteUserPost = async (postId, userId) => {
    const response = await deletePost(postId, userId);

    dispatch(removePost(postId));

    return response;
  };

  const editPost = async (postId, data) => {
    const response = await updatePostApi(postId, data);

    dispatch(updatePost(response.data.post));

    return response;
  };

  return {
    posts,
    fetchPosts,
    createNewPost,
    deleteUserPost,
    editPost,
  };
}
