import React from 'react';
export default function AuthPageScene3D() {
  return (
    <div className="w-full h-full min-h-screen relative bg-[#050507] overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] blur-[140px] rounded-full pointer-events-none" />
      
      <div className="absolute inset-0 lg:left-1/4 w-full lg:w-3/4 h-full flex items-center justify-center transform scale-75 sm:scale-90 transition-transform duration-500">
      </div>
      <iframe 
        src="https://my.spline.design/ailandingpagewebdesign3danimation-P5vBX4AfPlyNXzGggfobrJtn/" 
        className="w-full absolute inset-0 border-0 m-0 p-0 block"
        style={{
          height: 'calc(100% + 50px)',
          top: 0,
        }}
        title="Spline 3D Scene Node"
        allowFullScreen
      />
    </div>
  );
}