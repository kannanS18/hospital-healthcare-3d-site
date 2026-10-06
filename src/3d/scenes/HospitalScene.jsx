import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

/**
 * 3D Doctor Model loaded from /models/docmodel.glb
 * With Walk-up entrance, Cursor Tracking (Mascot Gaze), Breathing, and Interactivity
 */
/**
 * Helper to build custom procedural skeleton and bind docmodel.glb mesh into a SkinnedMesh
 */
function createRiggedDoctor(scene) {
  let sourceMesh = null;
  scene.traverse((child) => {
    if (child.isMesh && !sourceMesh) {
      sourceMesh = child;
    }
  });

  if (!sourceMesh) return null;

  // Build Bone Hierarchy
  const root = new THREE.Bone(); root.name = 'root';
  const hips = new THREE.Bone(); hips.name = 'hips'; root.add(hips);
  const spine = new THREE.Bone(); spine.name = 'spine'; spine.position.set(0, 0.28, 0); hips.add(spine);
  const chest = new THREE.Bone(); chest.name = 'chest'; chest.position.set(0, 0.22, 0); spine.add(chest);
  const neck = new THREE.Bone(); neck.name = 'neck'; neck.position.set(0, 0.18, 0); chest.add(neck);
  const head = new THREE.Bone(); head.name = 'head'; head.position.set(0, 0.09, 0); neck.add(head);

  // Left Arm (+X, viewer's right)
  const lUpperArm = new THREE.Bone(); lUpperArm.name = 'lUpperArm'; lUpperArm.position.set(0.22, 0.04, 0); chest.add(lUpperArm);
  const lLowerArm = new THREE.Bone(); lLowerArm.name = 'lLowerArm'; lLowerArm.position.set(0.22, -0.01, 0); lUpperArm.add(lLowerArm);
  const lHand = new THREE.Bone(); lHand.name = 'lHand'; lHand.position.set(0.20, 0, 0); lLowerArm.add(lHand);

  // Right Arm (-X, viewer's left)
  const rUpperArm = new THREE.Bone(); rUpperArm.name = 'rUpperArm'; rUpperArm.position.set(-0.22, 0.04, 0); chest.add(rUpperArm);
  const rLowerArm = new THREE.Bone(); rLowerArm.name = 'rLowerArm'; rLowerArm.position.set(-0.22, -0.01, 0); rUpperArm.add(rLowerArm);
  const rHand = new THREE.Bone(); rHand.name = 'rHand'; rHand.position.set(-0.20, 0, 0); rLowerArm.add(rHand);

  // Left Leg
  const lThigh = new THREE.Bone(); lThigh.name = 'lThigh'; lThigh.position.set(0.11, -0.15, 0); hips.add(lThigh);
  const lCalf = new THREE.Bone(); lCalf.name = 'lCalf'; lCalf.position.set(0, -0.37, 0); lThigh.add(lCalf);
  const lFoot = new THREE.Bone(); lFoot.name = 'lFoot'; lFoot.position.set(0, -0.36, 0.04); lCalf.add(lFoot);

  // Right Leg
  const rThigh = new THREE.Bone(); rThigh.name = 'rThigh'; rThigh.position.set(-0.11, -0.15, 0); hips.add(rThigh);
  const rCalf = new THREE.Bone(); rCalf.name = 'rCalf'; rCalf.position.set(0, -0.37, 0); rThigh.add(rCalf);
  const rFoot = new THREE.Bone(); rFoot.name = 'rFoot'; rFoot.position.set(0, -0.36, 0.04); rCalf.add(rFoot);

  const bones = [
    root, hips, spine, chest, neck, head,
    lUpperArm, lLowerArm, lHand,
    rUpperArm, rLowerArm, rHand,
    lThigh, lCalf, lFoot,
    rThigh, rCalf, rFoot
  ];

  root.updateWorldMatrix(true, true);

  // Clone geometry and assign smooth skinning weights
  const srcGeo = sourceMesh.geometry;
  const positions = srcGeo.attributes.position.array;
  const vertCount = srcGeo.attributes.position.count;

  function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  const skinIndices = [];
  const skinWeights = [];

  for (let i = 0; i < vertCount; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];

    let b0 = 1, w0 = 1.0;
    let b1 = 0, w1 = 0.0;

    if (x > 0.18 && y > 0.28 && y < 0.72) {
      // Left arm
      if (x > 0.62) {
        b0 = 8; w0 = 1.0;
      } else if (x > 0.44) {
        const t = smoothstep(0.44, 0.62, x);
        b0 = 7; w0 = 1.0 - t;
        b1 = 8; w1 = t;
      } else if (x > 0.23) {
        const t = smoothstep(0.23, 0.44, x);
        b0 = 6; w0 = 1.0 - t;
        b1 = 7; w1 = t;
      } else {
        const t = smoothstep(0.18, 0.23, x);
        b0 = 3; w0 = 1.0 - t;
        b1 = 6; w1 = t;
      }
    } else if (x < -0.18 && y > 0.28 && y < 0.72) {
      // Right arm
      const ax = -x;
      if (ax > 0.62) {
        b0 = 11; w0 = 1.0;
      } else if (ax > 0.44) {
        const t = smoothstep(0.44, 0.62, ax);
        b0 = 10; w0 = 1.0 - t;
        b1 = 11; w1 = t;
      } else if (ax > 0.23) {
        const t = smoothstep(0.23, 0.44, ax);
        b0 = 9; w0 = 1.0 - t;
        b1 = 10; w1 = t;
      } else {
        const t = smoothstep(0.18, 0.23, ax);
        b0 = 3; w0 = 1.0 - t;
        b1 = 9; w1 = t;
      }
    } else if (y >= 0.74) {
      b0 = 5; w0 = 1.0;
    } else if (y >= 0.65) {
      const t = smoothstep(0.65, 0.74, y);
      b0 = 4; w0 = 1.0 - t;
      b1 = 5; w1 = t;
    } else if (y >= 0.35) {
      const t = smoothstep(0.35, 0.65, y);
      b0 = 2; w0 = 1.0 - t;
      b1 = 3; w1 = t;
    } else if (y >= 0.05) {
      const t = smoothstep(0.05, 0.35, y);
      b0 = 1; w0 = 1.0 - t;
      b1 = 2; w1 = t;
    } else {
      const isLeft = x >= 0;
      if (y < -0.85) {
        b0 = isLeft ? 14 : 17; w0 = 1.0;
      } else if (y < -0.52) {
        const t = smoothstep(-0.85, -0.52, y);
        b0 = isLeft ? 14 : 17; w0 = 1.0 - t;
        b1 = isLeft ? 13 : 16; w1 = t;
      } else {
        const t = smoothstep(-0.52, 0.05, y);
        b0 = isLeft ? 13 : 16; w0 = 1.0 - t;
        b1 = isLeft ? 12 : 15; w1 = t;
      }
    }

    const sum = w0 + w1;
    skinIndices.push(b0, b1, 0, 0);
    skinWeights.push(w0 / sum, w1 / sum, 0, 0);
  }

  const geo = srcGeo.clone();
  geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

  const skeleton = new THREE.Skeleton(bones);
  const mat = sourceMesh.material.clone();
  mat.roughness = Math.min(mat.roughness || 0.5, 0.6);
  mat.metalness = Math.min(mat.metalness || 0.1, 0.15);

  const skinnedMesh = new THREE.SkinnedMesh(geo, mat);
  skinnedMesh.castShadow = true;
  skinnedMesh.receiveShadow = true;
  skinnedMesh.add(root);
  skinnedMesh.bind(skeleton);

  // Set initial natural resting standing posture
  lUpperArm.rotation.set(0.08, 0, -1.18);
  lLowerArm.rotation.set(0, 0, -0.15);
  rUpperArm.rotation.set(0.08, 0, 1.18);
  rLowerArm.rotation.set(0, 0, 0.15);

  root.updateWorldMatrix(true, true);

  return {
    skinnedMesh,
    bones: {
      root, hips, spine, chest, neck, head,
      lUpperArm, lLowerArm, lHand,
      rUpperArm, rLowerArm, rHand,
      lThigh, lCalf, lFoot,
      rThigh, rCalf, rFoot
    }
  };
}

/**
 * 3D Doctor Mascot loaded from /models/docmodel.glb
 * With Procedural Skeleton Rig, Standing Posture, Walk Entrance, Interactivity, and Waving Animation
 */
function RealDocModel({ config, updateConfig }) {
  const groupRef = useRef();
  const rippleRef = useRef();

  // Load user's provided 3D doctor model
  const { scene } = useGLTF('./models/docmodel.glb');
  const rig = useMemo(() => createRiggedDoctor(scene), [scene]);

  // Walk-up entrance animation state
  const [isWalkingIn, setIsWalkingIn] = useState(true);
  const [walkTimer, setWalkTimer] = useState(0);
  const [isGreeting, setIsGreeting] = useState(false);

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

    setTimeout(() => {
      setIsGreeting(false);
      updateConfig({ isWaving: false });
    }, 3400);
  };

  // Animation Loop with Procedural Skeletal Animation
  useFrame((state, delta) => {
    if (!rig) return;
    const time = state.clock.elapsedTime;
    const { bones } = rig;

    // 1. Walk-Up Entrance Sequence
    if (isWalkingIn) {
      const nextTime = walkTimer + delta;
      setWalkTimer(nextTime);
      const walkDuration = 2.4;
      const progress = Math.min(1, nextTime / walkDuration);
      const ease = 1 - Math.pow(1 - progress, 3);

      const startZ = -1.6;
      const targetZ = 0.0;
      const currentZ = startZ + (targetZ - startZ) * ease;

      const stepFreq = 10;
      const stepBob = Math.abs(Math.sin(nextTime * stepFreq)) * 0.035 * (1 - progress);
      const legSwing = Math.sin(nextTime * stepFreq) * 0.32 * (1 - progress);

      if (groupRef.current) {
        groupRef.current.position.z = currentZ;
        groupRef.current.position.y = -0.95 + stepBob;
      }

      // Natural leg strides
      bones.lThigh.rotation.x = legSwing;
      bones.rThigh.rotation.x = -legSwing;
      bones.lCalf.rotation.x = Math.max(0, -legSwing) * 0.35;
      bones.rCalf.rotation.x = Math.max(0, legSwing) * 0.35;

      // Arm swing during walking
      bones.lUpperArm.rotation.set(0.10 - legSwing * 0.25, 0, -1.12);
      bones.rUpperArm.rotation.set(0.10 + legSwing * 0.25, 0, 1.12);
      bones.lLowerArm.rotation.set(0, 0, -0.2);
      bones.rLowerArm.rotation.set(0, 0, 0.2);

      if (rippleRef.current) {
        rippleRef.current.scale.set(1 + progress * 0.8, 1 + progress * 0.8, 1);
        rippleRef.current.material.opacity = Math.max(0, 0.35 - progress * 0.3);
      }

      if (progress >= 1) {
        setIsWalkingIn(false);
        bones.lThigh.rotation.set(0, 0, -0.01);
        bones.rThigh.rotation.set(0, 0, 0.01);
        bones.lCalf.rotation.set(0, 0, 0);
        bones.rCalf.rotation.set(0, 0, 0);
      }
    } else {
      // 2. Idle Natural Stance & Breathing
      if (groupRef.current) {
        groupRef.current.position.y = -0.95;
      }

      // Calm, dignified breathing rhythm
      const breath = Math.sin(time * 1.8) * 0.012;
      bones.chest.rotation.x = breath;
      bones.spine.position.y = 0.28 + breath * 0.08;

      // Subtle human weight-shift sway
      bones.hips.rotation.y = Math.sin(time * 0.7) * 0.015;
      bones.hips.rotation.z = Math.cos(time * 0.7) * 0.008;

      // Grounded resting legs
      bones.lThigh.rotation.set(0, 0, -0.015);
      bones.rThigh.rotation.set(0, 0, 0.015);
      bones.lCalf.rotation.set(0, 0, 0);
      bones.rCalf.rotation.set(0, 0, 0);

      // Left arm rests gracefully with natural elbow contour
      bones.lUpperArm.rotation.z = THREE.MathUtils.damp(bones.lUpperArm.rotation.z, -1.12, 5, delta);
      bones.lUpperArm.rotation.x = THREE.MathUtils.damp(bones.lUpperArm.rotation.x, 0.12, 5, delta);
      bones.lLowerArm.rotation.z = THREE.MathUtils.damp(bones.lLowerArm.rotation.z, -0.22, 5, delta);
      bones.lHand.rotation.z = 0;

      // 3. Head & Neck Gaze Tracking (attentive, calm eye contact)
      const targetLookX = (config.mascotFollow !== false ? state.pointer.x : 0) * 0.32;
      const targetLookY = (config.mascotFollow !== false ? -state.pointer.y : 0) * 0.16;
      bones.head.rotation.y = THREE.MathUtils.damp(bones.head.rotation.y, targetLookX, 5, delta);
      bones.head.rotation.x = THREE.MathUtils.damp(bones.head.rotation.x, targetLookY, 5, delta);
      bones.neck.rotation.y = THREE.MathUtils.damp(bones.neck.rotation.y, targetLookX * 0.45, 5, delta);

      // 4. Professional Greeting Gesture (Welcoming, polite doctor greeting)
      const isWavingActive = isGreeting || config.isWaving;
      if (isWavingActive) {
        // Upper arm: moves forward into an open welcoming posture
        bones.rUpperArm.rotation.z = THREE.MathUtils.damp(bones.rUpperArm.rotation.z, 0.25, 6, delta);
        bones.rUpperArm.rotation.y = THREE.MathUtils.damp(bones.rUpperArm.rotation.y, 0.45, 6, delta);
        bones.rUpperArm.rotation.x = THREE.MathUtils.damp(bones.rUpperArm.rotation.x, 0.22, 6, delta);

        // Forearm: raised in a polite, dignified wave beside the shoulder
        const waveOsc = Math.sin(time * 7);
        bones.rLowerArm.rotation.z = THREE.MathUtils.damp(bones.rLowerArm.rotation.z, -1.25 + waveOsc * 0.18, 7, delta);
        bones.rLowerArm.rotation.y = THREE.MathUtils.damp(bones.rLowerArm.rotation.y, 0.12, 6, delta);

        // Hand: gentle welcoming hand motion
        bones.rHand.rotation.z = waveOsc * 0.25;
        bones.rHand.rotation.y = 0.2;

        // Friendly reassuring head nod
        bones.head.rotation.z = THREE.MathUtils.damp(bones.head.rotation.z, -0.04, 5, delta);
        bones.head.rotation.x = THREE.MathUtils.damp(bones.head.rotation.x, targetLookY + Math.sin(time * 3.5) * 0.03, 5, delta);
      } else {
        // Return right arm smoothly to professional standing rest pose
        bones.rUpperArm.rotation.z = THREE.MathUtils.damp(bones.rUpperArm.rotation.z, 1.12, 5, delta);
        bones.rUpperArm.rotation.x = THREE.MathUtils.damp(bones.rUpperArm.rotation.x, 0.12, 5, delta);
        bones.rUpperArm.rotation.y = THREE.MathUtils.damp(bones.rUpperArm.rotation.y, 0.10, 5, delta);
        bones.rLowerArm.rotation.z = THREE.MathUtils.damp(bones.rLowerArm.rotation.z, 0.22, 5, delta);
        bones.rLowerArm.rotation.y = THREE.MathUtils.damp(bones.rLowerArm.rotation.y, 0, 5, delta);
        bones.rHand.rotation.z = THREE.MathUtils.damp(bones.rHand.rotation.z, 0, 5, delta);
        bones.rHand.rotation.y = THREE.MathUtils.damp(bones.rHand.rotation.y, 0, 5, delta);
        bones.head.rotation.z = THREE.MathUtils.damp(bones.head.rotation.z, 0, 5, delta);
      }
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={handleDoctorClick}>
      {/* Walking & Posing Master Group */}
      <group ref={groupRef} position={[0, -0.95, 0]}>
        {/* Feet touch podium surface (Y = -0.95), full body cleanly framed */}
        <group position={[0, 0.952 * 0.92, 0]}>
          {rig && <primitive object={rig.skinnedMesh} scale={0.92} />}
        </group>
      </group>

      {/* ----------------- PROFESSIONAL CLINICAL HUD TELEMETRY CARDS ----------------- */}
      {/* 1. Board Certified Physician Badge (Top Left) */}
      <Float speed={1.5} rotationIntensity={0.06} floatIntensity={0.35}>
        <Html position={[-1.15, 0.70, 0.2]} center distanceFactor={6}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-slate-900/5 select-none pointer-events-none whitespace-nowrap">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-slate-900 uppercase">Board Certified</div>
              <div className="text-[9px] font-semibold text-emerald-700">Internal Medicine • Lead MD</div>
            </div>
          </div>
        </Html>
      </Float>

      {/* 2. Level-1 Trauma & 24/7 Rapid Response (Top Right) */}
      <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.4}>
        <Html position={[1.18, 0.60, 0.2]} center distanceFactor={6}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-slate-900/5 select-none pointer-events-none whitespace-nowrap">
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center text-[10px] font-black border border-emerald-200/60">
              24h
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-slate-900 uppercase">Level-1 Trauma</div>
              <div className="text-[9px] font-semibold text-emerald-700">Immediate Triage Active</div>
            </div>
          </div>
        </Html>
      </Float>

      {/* 3. Clinical Precision Badge (Bottom Right) */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <Html position={[1.12, -0.22, 0.3]} center distanceFactor={6}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-900/5 select-none pointer-events-none whitespace-nowrap">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
              ✓
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-slate-900 uppercase">99.8% Precision</div>
              <div className="text-[9px] font-medium text-slate-500">Diagnostic Accuracy</div>
            </div>
          </div>
        </Html>
      </Float>

      {/* ----------------- ARCHITECTURAL CLINICAL PODIUM ----------------- */}
      {/* Matte White Medical Stage */}
      <mesh position={[0, -0.98, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.2, 0.06, 48]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Glowing Clinical Emerald Halo Ring */}
      <mesh position={[0, -0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.012, 16, 64]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Subtle Step Ripple Ring */}
      <mesh ref={rippleRef} position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
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

useGLTF.preload('./models/docmodel.glb');
