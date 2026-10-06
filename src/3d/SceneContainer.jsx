import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Environment, Html, ContactShadows } from '@react-three/drei';
import { useVerticalStore } from '../store/useVerticalStore';
import { HospitalScene } from './scenes/HospitalScene';
import { CustomizerToolbar } from './components/CustomizerToolbar';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

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
    controlsRef.current.object.position.set(0, 0.16, 2.95);
    controlsRef.current.target.set(0, 0.05, 0);
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1.6}
      maxDistance={5.2}
      maxPolarAngle={Math.PI / 2 - 0.05} // Keep above floor
      dampingFactor={0.05}
    />
  );
}

export function SceneContainer() {
  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden select-none">
      <CanvasErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 0.16, 2.95], fov: 36 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
        >
        <Suspense fallback={<Loader />}>
          {/* Natural Soft Clinical Lighting */}
          <Environment preset="city" environmentIntensity={0.5} />

          {/* Ambient & Diffused Studio Fill */}
          <ambientLight intensity={0.55} />
          
          {/* Key Portrait Light with Soft Shadows */}
          <directionalLight
            position={[2.5, 4.5, 3.5]}
            intensity={0.9}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          
          {/* Soft Cool Clinical Fill Light */}
          <directionalLight
            position={[-3, 2.5, 2]}
            intensity={0.45}
            color="#f1f5f9"
          />

          {/* Subtle Silhouette Emerald Accent Rim */}
          <directionalLight
            position={[0, 2.5, -2.8]}
            intensity={0.5}
            color="#10b981"
          />

          {/* 3D Doctor Mascot Scene */}
          <HospitalScene />

          {/* Realistic Contact Shadow on Podium */}
          <ContactShadows
            position={[0, -0.955, 0]}
            opacity={0.45}
            scale={2.6}
            blur={1.8}
            far={1.4}
            color="#047857"
          />

          {/* Camera Controls */}
          <CameraRig />
        </Suspense>
      </Canvas>
      </CanvasErrorBoundary>

      {/* 3D Floating Live Controls Toolbar */}
      <CustomizerToolbar />
    </div>
  );
}
