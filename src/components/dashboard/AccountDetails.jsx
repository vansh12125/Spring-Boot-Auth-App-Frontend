import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, UserCheck, Fingerprint } from 'lucide-react';
import { useAuth } from "@/hooks";
import {CopyToClipboard} from "@/service"

export default function AccountDetails() {
  const { user } = useAuth();
  const infoFields = [
    { label: "Full Name", value: user.name, icon: UserCheck },
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Username", value: `u/${user.username}`, icon: Shield },
    { label: "User ID", value: user.userId, icon: Fingerprint, mono: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full backdrop-blur-2xl bg-black/40 border border-white/[0.06] rounded-2xl p-6 shadow-xl text-left"
    >
      <div className="mb-6 border-b border-white/[0.04] pb-4">
        <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">Account Details</h2>
        <p className="text-xs text-gray-400 mt-0.5">Your verified profile information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoFields.map((field, idx) => {
          const IconComponent = field.icon;
          return (
            <div key={idx} className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl flex items-start space-x-3" 
            onClick={()=>{
              CopyToClipboard(field.value);
            }}>
              <IconComponent className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">{field.label}</span>
                <span className={`block text-xs sm:text-sm text-gray-200 truncate ${field.mono ? 'font-mono text-white' : ''}`}>
                  {field.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}