import { Scene3D } from "@/components/three";
import UIOverlay from "./UIOverlay";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D />
      </div>
      <UIOverlay />
    </>
  );
}
