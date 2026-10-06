import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { useVerticalStore } from '../store/useVerticalStore';
import { HospitalScene } from './scenes/HospitalScene';
import { CustomizerToolbar } from './components/CustomizerToolbar';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/95 border border-emerald-200 shadow-2xl backdrop-blur-md">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold tracking-wider text-emerald-800">
          Loading 3D Doctor Model...
        </span>
      </div>
    </Html>
  );
}

// Camera Rig configured specifically for 3D Doctor Mascot
function CameraRig() {
  const controlsRef = useRef();

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.object.position.set(0, 0.45, 3.4);
    controlsRef.current.target.set(0, 0.35, 0);
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1.8}
      maxDistance={6.0}
      maxPolarAngle={Math.PI / 2 - 0.05} // Keep above floor
      dampingFactor={0.05}
    />
  );
}

export function SceneContainer() {
  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden select-none">
      <Canvas
        shadows
        camera={{ position: [0, 0.45, 3.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<Loader />}>
          {/* Studio Clinical Lighting */}
          <Environment preset="studio" environmentIntensity={0.65} />

          {/* Ambient & Key Lights */}
          <ambientLight intensity={0.8} />
          
          {/* Key Daylight */}
          <directionalLight
            position={[3, 5, 4]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Soft Fill Light */}
          <directionalLight
            position={[-3, 3, 2]}
            intensity={0.6}
            color="#f0fdf4"
          />

          {/* Signature Hospital Emerald Rim Light */}
          <directionalLight
            position={[0, 3, -3]}
            intensity={1.4}
            color="#10b981"
          />

          {/* 3D Doctor Mascot Scene (User's docmodel.glb) */}
          <HospitalScene />

          {/* Camera Controls */}
          <CameraRig />
        </Suspense>
      </Canvas>

      {/* 3D Floating Live Controls Toolbar */}
      <CustomizerToolbar />
    </div>
  );
}
