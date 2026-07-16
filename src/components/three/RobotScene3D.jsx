import { React, useState } from "react";
import { LoadingAnimation } from "@/components/ui";

export default function RobotScene3D() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="fixed inset-0 w-full h-full min-h-screen bg-[#050507] overflow-hidden z-0 select-none pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.02] z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 right-0 lg:right-12 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] blur-[140px] rounded-full z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-full lg:w-1/2 overflow-hidden pointer-events-auto z-20">
        {loading && (
          <LoadingAnimation
            fullScreen={false}
            className="w-full h-full border-0 m-0 p-0 block"
          />
        )}
        <iframe
          onLoad={() => {
            setLoading(false);
          }}
          src="https://my.spline.design/nexbotrobotcharacterconcept-colpiD92BrDptqxj9kzMsNdz/"
          className="w-full h-full border-0 m-0 p-0 block"
          style={{
            height: "calc(100% + 50px)",
            top: 0,
          }}
          title="Nexbot Robot Scene Node"
        />
      </div>
    </div>
  );
}
