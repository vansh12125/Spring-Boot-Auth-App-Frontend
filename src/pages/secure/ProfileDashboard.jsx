import React from 'react';
import { motion } from 'framer-motion';
import {Grid} from '@/components/common/';

// Import our modular sub-components
import {AccountDetails,DeveloperMetrics,ProfileHeader,SecuritySettings} from "@/components/dashboard"

export default function ProfileDashboard() {
  // Mock data matching inputs from registration steps
  const userProfile = {
    name: "Vansh Sahu",
    username: "kernel_panic",
    email: "vansh@devsphere.io",
    userId: "usr_dvs_99x7f25b",
    joinedDate: "July 11, 2026",
    nodeStatus: "Active Operational",
    authProvider: "GitHub"
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-gray-300 overflow-x-hidden antialiased flex flex-col pt-24 pb-16">
      {/* Background Matrix Grid */}
      <Grid />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex-grow">
        
        {/* Section Heading Index */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3 mb-6"
        >
          <span className="text-[10px] font-mono tracking-widest text-gray-500">DSH-01</span>
          <div className="h-[1px] w-12 bg-gray-800" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">User Control Panel</span>
        </motion.div>

        {/* Dynamic Multi-Grid Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Top Full-Width Header Row */}
          <div className="lg:col-span-12">
            <ProfileHeader user={userProfile} />
          </div>

          {/* Left Column Area: Details & Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <AccountDetails user={userProfile} />
            <SecuritySettings user={userProfile} />
          </div>

          {/* Right Column Area: Analytics Platform Metrics */}
          <div className="lg:col-span-5">
            <DeveloperMetrics />
          </div>

        </div>
      </div>
    </div>
  );
}