import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, UserCheck } from 'lucide-react';

export default function ProfileHeader({ user }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
        {/* Modern Minimal Graphic Avatar */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center text-xl font-bold text-white tracking-wider shadow-inner font-mono select-none">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div>
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">{user.name}</h1>
            <span className="px-2 py-0.5 text-[9px] font-mono font-medium rounded bg-white/5 border border-white/5 text-gray-400 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-0.5">@{user.username}</p>
        </div>
      </div>

      {/* Primary Context Actions Buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-gray-200 transition-colors shadow-lg">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 rounded-lg text-xs font-mono text-gray-400 hover:text-white transition-colors">
          <LogOut className="w-3.5 h-3.5" />
          <span>Disconnect</span>
        </button>
      </div>
    </motion.div>
  );
}