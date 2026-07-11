import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
function VoxelCluster({ isMobile }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const timeRef = useRef(0);
  const { gl } = useThree();
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const targetPositionY = useRef(0);
  const grungeTexture = useTexture("/textures/grunge.jpg");
  grungeTexture.wrapS = THREE.RepeatWrapping;
  grungeTexture.wrapT = THREE.RepeatWrapping;
  grungeTexture.repeat.set(1, 1); 
  grungeTexture.colorSpace = THREE.SRGBColorSpace;
  grungeTexture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 16);
  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    timeRef.current += safeDelta;
    const time = timeRef.current;
    targetRotationX.current = Math.sin(time * 0.15) * 0.2;
    targetRotationY.current = time * 0.1;
    targetPositionY.current = Math.sin(time * 0.4) * 0.1 + (isMobile ? -0.4 : 0);
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX.current, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY.current, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPositionY.current, 0.05);
      const targetX = isMobile ? 0 : 1.3;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.25;
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.2;
      ring2Ref.current.rotation.y = time * 0.15;
    }
  });
  const blockPositions = [
    [-0.6, 0.6, 0.6], [0, 0.6, 0.6], [0.6, 0.6, 0.6],
    [-0.6, 0.6, 0],                  [0.6, 0.6, 0],
    [-0.6, 0.6, -0.6],[0, 0.6, -0.6],[0.6, 0.6, -0.6],
    [-0.6, 0, 0.6],  [0, 0, 0.6],    [0.6, 0, 0.6],
    [-0.6, 0, 0],                    [0.6, 0, 0],
    [-0.6, 0, -0.6], [0, 0, -0.6],   [0.6, 0, -0.6],
    [-0.6, -0.6, 0.6], [0, -0.6, 0.6], [0.6, -0.6, 0.6],
    [-0.6, -0.6, 0],                   [0.6, -0.6, 0],
    [-0.6, -0.6, -0.6],[0, -0.6, -0.6],[0.6, -0.6, -0.6],
  ];
  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.3, 0, 0]} scale={isMobile ? 1.4 : 2.0}>
      
      {blockPositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <boxGeometry args={[0.54, 0.54, 0.54]} />
          <meshStandardMaterial 
            color="#555555"
            metalness={0.2}
            roughness={0.6}
            map={grungeTexture}
            bumpMap={grungeTexture}
            bumpScale={0.04}
            roughnessMap={grungeTexture} 
          />
        </mesh>
      ))}
      
      <mesh position={[0, 0, 0.6]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight intensity={5} distance={6} color="#ffffff" />
      </mesh>
      
      <group ref={ring1Ref} rotation={[0.4, 0.5, 0]}>
        <mesh><torusGeometry args={[1.3, 0.006, 8, 64]} /><meshBasicMaterial color="#ffffff" opacity={0.1} transparent /></mesh>
        <mesh position={[1.3, 0, 0]}><sphereGeometry args={[0.035, 16, 16]} /><meshStandardMaterial color="#ffffff" roughness={0.1} /></mesh>
      </group>
      
      <group ref={ring2Ref} rotation={[-0.6, 1.2, 0]}>
        <mesh><torusGeometry args={[1.45, 0.006, 8, 64]} /><meshBasicMaterial color="#ffffff" opacity={0.1} transparent /></mesh>
        <mesh position={[0, 1.45, 0]}><sphereGeometry args={[0.035, 16, 16]} /><meshStandardMaterial color="#ffffff" roughness={0.1} /></mesh>
      </group>
    </group>
  );
}
export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="w-full h-full min-h-screen relative bg-[#050507]">
      <Canvas 
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        
        <directionalLight position={[3, 4, 4]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-3, 2, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, -3, 2]} intensity={0.5} color="#ffffff" />
        <Suspense fallback={null}>
          <VoxelCluster isMobile={isMobile} />
        </Suspense>
        <Environment preset="studio" intensity={0.2} />
      </Canvas>
    </div>
  );
}