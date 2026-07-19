import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CircleCheck,KeyRound } from "lucide-react";
import { useAuth } from "@/hooks";
import { LinkGoogleAccount, LinkGithubAccount } from "@/service/AuthService";
export default function SecuritySettings() {
  const { user } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const provider = user?.provider ? [...user.provider] : [];
  const location = useLocation();
const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("linked") === "true") {
      setSuccess("Account linked successfully.");
    }
    if (params.has("alreadyLinked")) {
      setSuccess("Account is already linked.");
    }
    if (params.get("error") === "email_mismatch") {
      setError(
        "The selected account email does not match your existing account.",
      );
    }
    if (params.get("error") === "user_not_found") {
      setError("User not found.");
    }
    if ([...params.keys()].length > 0) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl text-left"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2.5 text-xs text-red-400 font-mono"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-2.5 text-xs text-green-400 font-mono"
        >
          <CircleCheck className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </motion.div>
      )}
      <div className="mb-4 border-b border-white/[0.04] pb-4">
        <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
          Account Security
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Manage your connected social accounts.
        </p>
      </div>
      <div className="space-y-3">
        {}
        <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="flex items-center space-x-3">
            <KeyRound className="w-4 h-4 text-gray-500" />
            <div>
              <span className="block text-xs text-white font-medium">
                Google Account
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                {provider.includes("GOOGLE")
                  ? "Linked to your Google account."
                  : "Not connected to Google."}
              </span>
            </div>
          </div>
          {provider.includes("GOOGLE") ? (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-green-400 select-none">
              CONNECTED
            </span>
          ) : (
            <button
              onClick={LinkGoogleAccount}
              className="text-[10px] font-mono px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-gray-300 transition-colors"
            >
              LINK ACCOUNT
            </button>
          )}
        </div>
        {}
        <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="flex items-center space-x-3">
            <KeyRound className="w-4 h-4 text-gray-500" />
            <div>
              <span className="block text-xs text-white font-medium">
                GitHub Account
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                {provider.includes("GITHUB")
                  ? "Linked to your GitHub account."
                  : "Not connected to GitHub."}
              </span>
            </div>
          </div>
          {provider.includes("GITHUB") ? (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-green-400 select-none">
              CONNECTED
            </span>
          ) : (
            <button
              onClick={LinkGithubAccount}
              className="text-[10px] font-mono px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-gray-300 transition-colors"
            >
              LINK ACCOUNT
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
