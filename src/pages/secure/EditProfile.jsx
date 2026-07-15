import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Check, Lock, AlertCircle } from 'lucide-react';
import {Grid} from '@/components/common'; 
export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "Vansh Sahu",
    username: "kernel_panic",
    email: "vansh@devsphere.io",
    bio: "Building cool web interfaces and tinkering with open-source project frameworks.",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file.");
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const impliesPasswordChange = formData.currentPassword || formData.newPassword || formData.confirmPassword;
    if (impliesPasswordChange) {
      if (!formData.currentPassword) {
        setError("You must enter your current password to save a new password.");
        return;
      }
      if (formData.newPassword.length < 6) {
        setError("Your new password must be at least 6 characters long.");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Your new password and confirmation password do not match.");
        return;
      }
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate('/dashboard');
    }, 1200);
  };
  return (
    <div className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#050507] text-gray-300 pt-24 pb-16">
      {}
      <Grid />
      <div className="max-w-3xl mx-auto w-full px-6 md:px-12 relative z-10">
        {}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            to="/dashboard" 
            className="inline-flex items-center space-x-2 text-xs font-mono text-gray-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-2xl text-left"
        >
          {}
          <div className="mb-6 border-b border-white/[0.04] pb-4">
            <h1 className="text-xl font-bold text-white tracking-tight">Edit Profile Settings</h1>
            <p className="text-xs text-gray-400 mt-0.5">Update your personal details, profile image, and platform access keys.</p>
          </div>
          {}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {}
            <div 
              onClick={triggerFileInput}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-4 cursor-pointer group transition-all duration-200"
            >
              {}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="relative select-none">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Upload Preview" 
                    className="w-16 h-16 rounded-xl object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center text-xl font-bold text-white tracking-wider font-mono">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                {}
                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <span className="block text-xs text-white font-medium group-hover:underline">Upload Profile Picture</span>
                <span className="block text-[10px] text-gray-500 mt-0.5">Click anywhere on this section to browse local image assets.</span>
              </div>
            </div>
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-name" className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  id="edit-name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-username" className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 mb-1">Username</label>
                <input 
                  type="text" 
                  name="username"
                  id="edit-username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="edit-email" className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  id="edit-email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="edit-bio" className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 mb-1">Bio / About Me</label>
                <textarea 
                  name="bio"
                  id="edit-bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono resize-none leading-relaxed"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
            </div>
            {}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]"></div>
              </div>
              <div className="relative flex justify-start text-[9px] font-mono uppercase">
                <span className="bg-[#09090c] pr-3 text-gray-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3 h-3" /> Security Credentials Matrix
                </span>
              </div>
            </div>
            {}
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-current-password" className="block text-[9px] font-mono uppercase tracking-wider text-gray-500 mb-1">Current Password</label>
                <input 
                  type="password" 
                  name="currentPassword"
                  id="edit-current-password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Required strictly to change security configurations"
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-new-password" className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 mb-1">New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    id="edit-new-password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="edit-confirm-password" className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    id="edit-confirm-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-type new password"
                    className="w-full bg-black/40 border border-white/5 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
                  />
                </div>
              </div>
            </div>
            {}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/[0.04]">
              <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 rounded-lg text-xs font-mono text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSaving}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 shadow-lg"
              >
                {isSaving ? (
                  <span className="font-mono text-[11px]">Saving Data...</span>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Profiles</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}