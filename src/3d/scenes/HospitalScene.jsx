import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

/**
 * 3D Doctor Model loaded from /models/docmodel.glb
 * With Walk-up entrance, Cursor Tracking (Mascot Gaze), Breathing, and Interactivity
 */
function RealDocModel({ config, updateConfig }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const floatingHeartRef = useRef();
  const rippleRef = useRef();

  // Load user's provided 3D doctor model
  const { scene } = useGLTF('/models/docmodel.glb');
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.min(child.material.roughness || 0.5, 0.65);
          child.material.metalness = Math.min(child.material.metalness || 0.1, 0.2);
          child.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Walk-up animation state
  const [isWalkingIn, setIsWalkingIn] = useState(true);
  const [walkTimer, setWalkTimer] = useState(0);
  const [isGreeting, setIsGreeting] = useState(false);

  // 3D Heart Geometry
  const heartGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.25, 0.25);
    shape.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0);
    shape.bezierCurveTo(-0.3, 0, -0.3, 0.35, -0.3, 0.35);
    shape.bezierCurveTo(-0.3, 0.55, -0.1, 0.77, 0.25, 0.95);
    shape.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
    shape.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0);
    shape.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.07,
      bevelThickness: 0.07,
    });
    geo.center();
    return geo;
  }, []);

  // Trigger Walk-Up Entrance Replay
  useEffect(() => {
    if (config.triggerWalkIn) {
      setIsWalkingIn(true);
      setWalkTimer(0);
      updateConfig({ triggerWalkIn: false });
    }
  }, [config.triggerWalkIn, updateConfig]);

  // Handle direct click on doctor model
  const handleDoctorClick = (e) => {
    e.stopPropagation();
    setIsGreeting(true);

    const dialogs = [
      "👋 Hello! Dr. Maya at your service. Our clinical teams are available 24/7!",
      "🩺 Telemetry check: Blood Pressure 120/80 mmHg, Pulse 72 BPM, SpO2 99%. All vitals optimal!",
      "✨ Preventive health tip: 20 minutes of daily physical activity reduces cardiovascular risk by 30%!",
      "🏥 Welcome to AuraCare! How can our specialists assist your recovery today?",
    ];
    const msg = dialogs[Math.floor(Math.random() * dialogs.length)];
    updateConfig({ speechMessage: msg, isWaving: true });

    setTimeout(() => setIsGreeting(false), 2400);
  };

  // Animation Loop with Walk-in Gait, Cursor Tracking, and Breathing
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // 1. Walk-Up Entrance Sequence
    if (isWalkingIn) {
      const nextTime = walkTimer + delta;
      setWalkTimer(nextTime);
      const walkDuration = 2.4; // 2.4s walk up
      const progress = Math.min(1, nextTime / walkDuration);

      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);

      // Walk from z = -1.6 to z = 0.05
      const startZ = -1.6;
      const targetZ = 0.05;
      const currentZ = startZ + (targetZ - startZ) * ease;

      // Realistic walking gait step bobbing
      const stepFreq = 12;
      const stepBob = Math.abs(Math.sin(nextTime * stepFreq)) * 0.07 * (1 - progress * 0.8);
      const stepSway = Math.sin(nextTime * stepFreq) * 0.04 * (1 - progress * 0.8);

      if (groupRef.current) {
        groupRef.current.position.z = currentZ;
        groupRef.current.position.y = -0.95 + stepBob;
        groupRef.current.rotation.y = stepSway;
      }

      if (rippleRef.current) {
        rippleRef.current.scale.set(1 + progress * 0.8, 1 + progress * 0.8, 1);
        rippleRef.current.material.opacity = Math.max(0, 0.4 - progress * 0.35);
      }

      if (progress >= 1) {
        setIsWalkingIn(false);
      }
    } else {
      // 2. Idle Mascot Stance & Breathing
      const breath = Math.sin(time * 2.2) * 0.015;
      const subtleSway = Math.sin(time * 0.9) * 0.012;

      if (groupRef.current) {
        groupRef.current.position.y = -0.95 + breath;
      }

      // 3. Mascot Cursor Tracking (Head & Body gaze follow mouse pointer)
      if (config.mascotFollow !== false && innerRef.current) {
        const targetYaw = state.pointer.x * 0.45;
        const targetPitch = -state.pointer.y * 0.22;
        const targetRoll = -state.pointer.x * 0.06;

        innerRef.current.rotation.y = THREE.MathUtils.damp(
          innerRef.current.rotation.y,
          targetYaw + subtleSway,
          5,
          delta
        );
        innerRef.current.rotation.x = THREE.MathUtils.damp(
          innerRef.current.rotation.x,
          targetPitch,
          5,
          delta
        );
        innerRef.current.rotation.z = THREE.MathUtils.damp(
          innerRef.current.rotation.z,
          targetRoll,
          5,
          delta
        );
      }

      // 4. Greeting / Wave Reactivity
      if (isGreeting || config.isWaving) {
        if (innerRef.current) {
          innerRef.current.position.y = Math.sin(time * 8) * 0.02;
        }
      } else if (innerRef.current) {
        innerRef.current.position.y = 0;
      }
    }

    // 5. Beating Floating Heart Hologram
    if (floatingHeartRef.current) {
      const pulsePhase = (time * 2.2) % 1;
      let heartScale = 0.32;
      if (pulsePhase < 0.15) {
        heartScale = 0.32 + Math.sin((pulsePhase * Math.PI) / 0.15) * 0.06;
      } else if (pulsePhase > 0.2 && pulsePhase < 0.35) {
        heartScale = 0.32 + Math.sin(((pulsePhase - 0.2) * Math.PI) / 0.15) * 0.04;
      }
      floatingHeartRef.current.scale.set(heartScale, heartScale, heartScale);
      floatingHeartRef.current.position.y = 0.9 + Math.sin(time * 1.6) * 0.05;
      floatingHeartRef.current.rotation.y = time * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={handleDoctorClick}>
      {/* Walking & Posing Master Group */}
      <group ref={groupRef} position={[0, -0.95, 0.05]}>
        {/* Inner pivot for cursor rotation */}
        <group ref={innerRef}>
          {/* Render user's docmodel.glb */}
          <primitive object={clonedScene} scale={1.12} position={[0, 0, 0]} />
        </group>
      </group>

      {/* ----------------- FLOATING 3D MEDICAL ACCENTS ----------------- */}
      {/* 1. Pulsing Beating Heart */}
      <mesh
        ref={floatingHeartRef}
        geometry={heartGeo}
        position={[0.88, 0.88, 0.25]}
        rotation={[0, 0, Math.PI]}
      >
        <meshStandardMaterial
          color="#ef4444"
          roughness={0.25}
          metalness={0.3}
          emissive="#991b1b"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 2. Floating Glowing Emerald Hospital Cross */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <group position={[-0.88, 0.95, 0.15]}>
          <mesh>
            <boxGeometry args={[0.09, 0.28, 0.06]} />
            <meshStandardMaterial
              color="#059669"
              metalness={0.4}
              roughness={0.2}
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[0.28, 0.09, 0.06]} />
            <meshStandardMaterial
              color="#059669"
              metalness={0.4}
              roughness={0.2}
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* 3. Floating Medicinal Capsule */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <group position={[0.78, 0.18, 0.45]} rotation={[0.6, 0.4, 0.8]} scale={[0.8, 0.8, 0.8]}>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
            <meshStandardMaterial color="#10b981" roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.07, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#10b981" roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
      </Float>

      {/* ----------------- CIRCULAR PODIUM & SHADOW FLOOR ----------------- */}
      <mesh position={[0, -0.98, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.1, 0.06, 36]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Glowing Emerald Ring */}
      <mesh position={[0, -0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.06, 0.015, 12, 48]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Walk Step Ripple Ring */}
      <mesh ref={rippleRef} position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Soft Ground Shadow Disc */}
      <mesh position={[0, -0.99, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 32]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/**
 * Main HospitalScene for React Three Fiber Viewport
 */
export function HospitalScene() {
  const hospitalConfig = useVerticalStore((state) => state.hospitalCustomizer);
  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);

  return (
    <group position={[0, 0.1, 0]}>
      <React.Suspense
        fallback={
          <Html center>
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/90 border border-emerald-200 shadow-xl backdrop-blur-md">
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-[11px] font-semibold text-emerald-800 tracking-wider">
                Loading 3D Doctor Model...
              </span>
            </div>
          </Html>
        }
      >
        <RealDocModel config={hospitalConfig} updateConfig={updateHospital} />
      </React.Suspense>
    </group>
  );
}

useGLTF.preload('/models/docmodel.glb');
