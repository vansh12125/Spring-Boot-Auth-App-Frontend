import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Share2, Clock } from "lucide-react";
import { Grid } from "@/components/common";
import { FloatingNav, Avatar } from "@/components/ui";
import { useAuth } from "@/hooks";
import { getAllPost, likePost, unLikePost } from "@/service/PostService";
export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const currentUserId = user?.userId || user?.id;
  useEffect(() => {
    getPosts();
  }, [currentUserId]);
  const getPosts = async () => {
    try {
      const response = await getAllPost();

      const normalizedPosts = response.data.map((post) => ({
        ...post,
        id: post.postId,
        likes: Array.isArray(post.likes) ? post.likes : [],
        hasLiked:
          Array.isArray(post.likes) && post.likes.includes(currentUserId),
      }));

      setPosts(normalizedPosts);
    } catch (error) {
      console.error("Could not fetch posts:", error);
    }
  };
  const handleLike = async (postId) => {
    if (!currentUserId) return;

    const previousPosts = [...posts];

    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) return post;

      const liked = post.likes.includes(currentUserId);

      return {
        ...post,
        likes: liked
          ? post.likes.filter((id) => id !== currentUserId)
          : [...post.likes, currentUserId],
        hasLiked: !liked,
      };
    });

    setPosts(updatedPosts);

    try {
      const clickedPost = previousPosts.find((p) => p.id === postId);

      if (clickedPost.likes.includes(currentUserId)) {
        await unLikePost(postId, currentUserId);
      } else {
        await likePost(postId, currentUserId);
      }
    } catch (error) {
      console.error("Like request failed:", error);
      setPosts(previousPosts);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-gray-300 pt-40 pb-32 overflow-x-hidden">
      <Grid />
      <div className="max-w-3xl mx-auto w-full px-6 relative z-10">
        <div className="mb-8 border-b border-white/[0.04] pb-4 text-left">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Community Feed
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Read the latest ideas, scripts, and updates from developers across
            the network.
          </p>
        </div>
        {posts.length === 0 ? (
          <div className="text-left text-sm text-gray-500 font-mono">
            No Post Available.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl text-left"
              >
                {}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={post.userData?.avatar}
                      alt={post.userData?.name || "User"}
                      className="w-10 h-10 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-white">
                        {post.userData?.name || "Anonymous"}
                      </span>
                      <span className="block text-[10px] font-mono text-gray-400">
                        @{post.userData?.username || "unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 text-gray-500 font-mono text-[10px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                {}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-white mb-2 tracking-tight leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {post.content}
                  </p>
                </div>
                {}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 text-xs font-mono transition-colors ${
                      post.hasLiked
                        ? "text-red-500 hover:text-red-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${post.hasLiked ? "fill-current text-red-500" : ""}`}
                    />
                    <span>{post.likes.length}</span>
                  </button>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comments</span>
                    </button>
                    <button className="flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <FloatingNav />
    </div>
  );
}
