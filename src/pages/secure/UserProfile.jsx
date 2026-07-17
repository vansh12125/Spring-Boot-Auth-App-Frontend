import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Grid } from "@/components/common";
import { FloatingNav, Avatar } from "@/components/ui";
import { getUserProfileByUsername } from "@/service/UserService";
// import UserPosts from "../components/profile/UserPosts";
export default function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showPosts, setShowPosts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchProfile();
    setShowPosts(false);
  }, [username]);
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getUserProfileByUsername(username);
      console.log(response);

      setProfile(response.data);
    } catch (err) {
      console.log(err);
      setError("User identity profile not found inside the network grid.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050507] text-gray-500 font-mono text-[10px] tracking-widest uppercase">
        <Grid />
        <Loader2 className="w-5 h-5 text-white/45 animate-spin mb-3" />
        <span>Syncing Registry Details...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050507] text-gray-400 font-mono text-xs">
        <Grid />
        <AlertCircle className="w-8 h-8 text-red-500/80 mb-3" />
        <p>{error}</p>
        <button
          onClick={() => navigate("/feed")}
          className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg text-xs transition-colors hover:bg-gray-200 cursor-pointer"
        >
          Return to Feed
        </button>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-gray-300 pt-40 pb-32 overflow-x-hidden">
      <Grid />
      <div className="max-w-3xl mx-auto w-full px-6 relative z-10 space-y-6">
        {}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-xl text-left"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <Avatar
              src={profile?.avatar || profile?.pictureUrl}
              alt={profile?.name}
              className="w-20 h-20 text-2xl shrink-0 border border-white/10"
              rounded="rounded-2xl"
            />
            <div className="min-w-0 flex-1 space-y-1.5">
              <h1 className="text-2xl font-bold text-white tracking-tight truncate">
                {profile?.name}
                <div>
                  {profile?.verified ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-mono uppercase tracking-wider">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-mono uppercase tracking-wider">
                      <HelpCircle className="w-2.5 h-2.5" />
                      Unverified
                    </span>
                  )}
                </div>
              </h1>

              <p className="text-xs text-gray-400 font-mono truncate">
                u/{profile?.username}
              </p>
              {profile?.bio && (
                <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1 max-w-xl">
                  {profile.bio}
                </p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 pt-3 text-[10px] font-mono text-gray-500 border-t border-white/[0.04] mt-2">
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile?.email}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Joined{" "}
                    {new Date(profile?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.04] flex justify-center sm:justify-end">
            <button
              onClick={() => setShowPosts(!showPosts)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono border tracking-wide transition-all duration-300 cursor-pointer ${
                showPosts
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Show Publications</span>
              {showPosts ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </motion.div>
        {}
        <AnimatePresence mode="wait">
          {showPosts && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {}
              {/* <UserPosts
                userId={profile?.userId || profile?.id || profile?._id}
              /> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FloatingNav />
    </div>
  );
}
