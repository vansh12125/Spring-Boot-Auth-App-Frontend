import React from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Smartphone } from 'lucide-react';

export default function SecuritySettings({ user }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl text-left"
    >
      <div className="mb-4 border-b border-white/[0.04] pb-4">
        <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">System Access Security</h2>
        <p className="text-xs text-gray-400 mt-0.5">Manage keys and authentication nodes vectors.</p>
      </div>

      <div className="space-y-3">
        {/* Linked OAuth Vector Row */}
        <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="flex items-center space-x-3">
            <KeyRound className="w-4 h-4 text-gray-500" />
            <div>
              <span className="block text-xs text-white font-medium">Federated Provider Route</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Linked directly via active {user.authProvider} OAuth handle loop.</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400">
            CONNECTED
          </span>
        </div>

        {/* 2FA Parameter Status Row */}
        <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-4 h-4 text-gray-500" />
            <div>
              <span className="block text-xs text-white font-medium">Two-Factor Passkey</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Require multi-token device validation prompts on new device access.</span>
            </div>
          </div>
          <button className="text-[10px] font-mono px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-gray-300 transition-colors">
            CONFIGURE
          </button>
        </div>
      </div>
    </motion.div>
  );
}