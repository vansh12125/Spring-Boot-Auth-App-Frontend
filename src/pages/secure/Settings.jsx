import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  User,
  LogOut,
  Shield,
  Laptop,
  Smartphone,
  Globe,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  X,
  Trash2,
  AlertTriangle,
  Link2Off,
  UserX,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Grid } from "@/components/common";
import {
  LogoutUser,
  LinkGoogleAccount,
  LinkGithubAccount,
  LogoutAllSession,
  getAllActiveSession,
  logoutParticularSession,
  deleteUser,
} from "@/service/AuthService";
import { logout } from "@/redux/authSlice";
import { useAuth } from "@/hooks";
import { FloatingNav } from "@/components/ui";

export default function Settings() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { user, dispatch } = useAuth();
  const provider = user?.provider ? [...user.provider] : [];

  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showConfirmLogoutAll, setShowConfirmLogoutAll] = useState(false);
  const [unlinkTarget, setUnlinkTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const [isLoading, SetIsLoading] = useState(true);
  const [deletingSessionId, setDeletingSessionId] = useState(null); // Track session currently being deleted
  const [sessions, setSessions] = useState([]);

  const triggerSuccess = (msg) => {
    setError("");
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 4000);
  };

  const triggerError = (msg) => {
    setSuccess("");
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  // Terminate a single session with loading state
  const handleLogoutSingleSession = async (sessionId) => {
    try {
      setDeletingSessionId(sessionId);
      await logoutParticularSession(sessionId);

      // Match against both sessionId and id for safety
      setSessions((prev) =>
        prev.filter((s) => (s.sessionId || s.id) !== sessionId),
      );
      triggerSuccess("Terminated target device session.");
    } catch (err) {
      console.error(err);
      triggerError("Failed to terminate session. Please try again.");
    } finally {
      setDeletingSessionId(null);
    }
  };

  const handleLogoutAllOtherSessions = async () => {
    try {
      await LogoutAllSession();
      await handleLogout();
    } catch (err) {
      triggerError(
        err.response?.data?.message || "Failed to terminate sessions.",
      );
    } finally {
      setShowConfirmLogoutAll(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") return;
    setShowDeleteModal(false);
    try {
      const response = await deleteUser();
      console.log(response);
      dispatch(logout());
      if (response.data.success) {
        navigate("/signin?success=deleted-successfully");
      }
    } catch (error) {}
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  const handleLogout = async () => {
    try {
      await LogoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(logout());
      navigate("/signin", { replace: true });
    }
  };

  function timeAgo(dateString) {
    if (!dateString) return "just now";
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (isNaN(secondsAgo)) return "invalid date";
    if (secondsAgo < 10) return "just now";

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(secondsAgo / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  const handleOpenSessionModal = async () => {
    setShowSessionsModal(true);
    SetIsLoading(true);
    try {
      const response = await getAllActiveSession();
      setSessions(response.data || []);
    } catch (err) {
      console.error(err);
      triggerError("Could not load active sessions.");
    } finally {
      SetIsLoading(false);
    }
  };

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
    <div className="relative min-h-screen w-full bg-[#050507] text-gray-300 pt-36 pb-32 overflow-x-hidden">
      <Grid />
      <div className="max-w-3xl mx-auto w-full px-6 relative z-10 space-y-6 text-left">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-xs font-mono text-gray-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-white/[0.04] pb-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Manage your account preferences, connected integrations, and active
            sessions.
          </p>
        </div>

        {/* Banners */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-mono"
            >
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{success}</span>
              </div>
              <button
                onClick={() => setSuccess("")}
                className="text-emerald-400/60 hover:text-emerald-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between text-xs text-red-400 font-mono"
            >
              <div className="flex items-center space-x-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-400/60 hover:text-red-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 1: General Options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl space-y-4"
        >
          <h2 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            General Options
          </h2>
          <div className="space-y-3">
            <div
              onClick={() => navigate("/edit-profile")}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Edit Profile
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Update avatar, bio, and personal details
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-400">
                    Log Out
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Sign out from current browser session
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Section 2: OAuth Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl space-y-4"
        >
          <h2 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Connected Accounts (OAuth)
          </h2>
          <div className="space-y-3">
            {/* Google */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                  G
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-white">Google</h3>
                    {provider.includes("GOOGLE") && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    {provider.includes("GOOGLE")
                      ? user?.email
                      : "Not linked to Google profile"}
                  </p>
                </div>
              </div>
              {provider.includes("GOOGLE") ? (
                <button
                  onClick={() => setUnlinkTarget("google")}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Link2Off className="w-3.5 h-3.5" />
                  <span>Unlink Account</span>
                </button>
              ) : (
                <button
                  onClick={LinkGoogleAccount}
                  className="px-4 py-1.5 rounded-lg text-xs font-mono bg-white hover:bg-gray-200 text-black font-semibold transition-all cursor-pointer"
                >
                  Connect
                </button>
              )}
            </div>

            {/* GitHub */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                  GH
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-white">GitHub</h3>
                    {provider.includes("GITHUB") && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    {provider.includes("GITHUB")
                      ? `@${user?.email}`
                      : "Not linked to GitHub developer profile"}
                  </p>
                </div>
              </div>
              {provider.includes("GITHUB") ? (
                <button
                  onClick={() => setUnlinkTarget("github")}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Link2Off className="w-3.5 h-3.5" />
                  <span>Unlink Account</span>
                </button>
              ) : (
                <button
                  onClick={LinkGithubAccount}
                  className="px-4 py-1.5 rounded-lg text-xs font-mono bg-white hover:bg-gray-200 text-black font-semibold transition-all cursor-pointer"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section 3: Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl space-y-4"
        >
          <h2 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Security & Device Sessions
          </h2>
          <div
            onClick={handleOpenSessionModal}
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-white">
                    Active Sessions
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white font-bold">
                    {sessions.length}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Inspect and revoke active logins across devices
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          </div>
        </motion.div>

        {/* Section 4: Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-2xl bg-red-950/10 border border-red-500/20 rounded-2xl p-6 shadow-xl space-y-4"
        >
          <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-semibold">
            Danger Zone
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-red-500/[0.03] border border-red-500/10">
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <UserX className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Delete Account
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Permanently wipe profile, posts, and network data
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setDeleteInput("");
                setShowDeleteModal(true);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal 1: Active Sessions List */}
      <AnimatePresence>
        {showSessionsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSessionsModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-[#09090d]/90 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 z-10 text-left space-y-6 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Active Login Sessions
                  </h2>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Devices logged into your account.
                  </p>
                </div>
                <button
                  onClick={() => setShowSessionsModal(false)}
                  className="p-1.5 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sessions List */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 animate-pulse"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5" />
                        <div className="min-w-0 space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <div className="h-3 bg-white/10 rounded w-28 md:w-36" />
                            {index === 0 && (
                              <div className="h-3 bg-emerald-500/10 border border-emerald-500/20 rounded w-20" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-2.5 bg-white/5 rounded w-16" />
                            <div className="h-2.5 bg-white/5 rounded w-2" />
                            <div className="h-2.5 bg-white/5 rounded w-20" />
                            <div className="h-2.5 bg-white/5 rounded w-2" />
                            <div className="h-2.5 bg-white/5 rounded w-12" />
                          </div>
                        </div>
                      </div>
                      {index !== 0 && (
                        <div className="w-8 h-8 rounded-lg bg-white/5 shrink-0" />
                      )}
                    </div>
                  ))
                ) : sessions.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-gray-500">
                    No active sessions found.
                  </div>
                ) : (
                  sessions.map((sess) => {
                    const currentId = sess.sessionId || sess.id;
                    const isDeletingThis = deletingSessionId === currentId;

                    return (
                      <div
                        key={currentId}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start space-x-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                            {sess.details?.device?.toLowerCase() === "mobile" ||
                            sess.details?.os
                              ?.toLowerCase()
                              .includes("android") ||
                            sess.details?.os
                              ?.toLowerCase()
                              .includes("iphone") ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Laptop className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-white truncate">
                                {sess.details?.browser && sess.details?.device
                                  ? `${sess.details.browser} on ${sess.details.device}`
                                  : "Unknown Device"}
                              </span>
                              {sess.current && (
                                <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                                  Current Device
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Globe className="w-3 h-3 text-gray-600" />
                                <span>
                                  {sess.details?.ipAddress || "0.0.0.0"}
                                </span>
                              </span>
                              <span>•</span>
                              <span className="text-gray-400">
                                {sess.details?.os || "Desktop"}
                              </span>
                              <span>•</span>
                              {sess.current ? (
                                <span className="text-green-400">Just Now</span>
                              ) : (
                                <span className="text-gray-400">
                                  {timeAgo(sess.lastUsedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!sess.current && (
                          <button
                            disabled={isDeletingThis}
                            onClick={() => handleLogoutSingleSession(currentId)}
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Terminate Session"
                          >
                            {isDeletingThis ? (
                              <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  disabled={sessions.filter((s) => !s.current).length === 0}
                  onClick={() => setShowConfirmLogoutAll(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-mono text-xs rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Terminate All Other Sessions
                </button>
                <button
                  onClick={() => setShowSessionsModal(false)}
                  className="w-full sm:w-auto px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Confirm Terminate All Sessions */}
      <AnimatePresence>
        {showConfirmLogoutAll && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmLogoutAll(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#09090d] border border-red-500/30 rounded-2xl p-6 z-20 text-left space-y-4 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Revoke All Other Sessions?
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Irreversible action.
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                You will be logged out on all devices including this current
                session.
              </p>
              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  onClick={() => setShowConfirmLogoutAll(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutAllOtherSessions}
                  className="px-4 py-2 bg-red-500 text-white font-semibold text-xs rounded-xl hover:bg-red-600 transition-all cursor-pointer shadow-lg shadow-red-500/20"
                >
                  Yes, Terminate All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 3: Unlink OAuth Provider */}
      <AnimatePresence>
        {unlinkTarget && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUnlinkTarget(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#09090d] border border-white/10 rounded-2xl p-6 z-20 text-left space-y-4 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Link2Off className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Unlink {unlinkTarget === "google" ? "Google" : "GitHub"}{" "}
                    Account?
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Disconnecting social provider
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                You will no longer be able to log in using this provider unless
                you reconnect it again later.
              </p>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setUnlinkTarget(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setUnlinkTarget(null)}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Unlink Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 4: Delete Account Confirmation */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0d0708] border border-red-500/40 rounded-2xl p-6 z-20 text-left space-y-4 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Permanently Delete Account?
                  </h3>
                  <p className="text-xs text-red-400 font-mono mt-0.5">
                    This action CANNOT be reversed.
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                All your profile info, publications, likes, and settings will be
                permanently wiped from the matrix grid.
              </p>
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                  Type <span className="text-red-400 font-bold">DELETE</span> to
                  confirm
                </label>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-3.5 py-2 bg-black/60 border border-red-500/30 rounded-xl text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteInput !== "DELETE"}
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-red-600/30"
                >
                  Confirm Permanent Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FloatingNav />
    </div>
  );
}
