import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

/**
 * 1. 3D Anatomical Beating Heart (Cardiovascular Suite)
 * With Dual-Cycle "Lub-Dub" Ventricular Pulse, Aorta Arch, Coronary Vessels & Flowing Blood Particles
 */
function BeatingHeart3D({ bpm = 72, xray = false, onSelectHotspot }) {
  const heartGroupRef = useRef();
  const bloodParticlesRef = useRef();
  const [hoveredSpot, setHoveredSpot] = useState(null);

  // Anatomical Heart Geometry
  const heartGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.45);
    shape.bezierCurveTo(0, 0.75, -0.4, 0.95, -0.75, 0.95);
    shape.bezierCurveTo(-1.15, 0.95, -1.35, 0.55, -1.35, 0.2);
    shape.bezierCurveTo(-1.35, -0.35, -0.85, -0.75, 0, -1.45);
    shape.bezierCurveTo(0.85, -0.75, 1.35, -0.35, 1.35, 0.2);
    shape.bezierCurveTo(1.35, 0.55, 1.15, 0.95, 0.75, 0.95);
    shape.bezierCurveTo(0.4, 0.95, 0, 0.75, 0, 0.45);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.65,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.22,
      bevelThickness: 0.22,
    });
    geo.center();
    return geo;
  }, []);

  // Arch of Aorta Geometry
  const aortaGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, 0.4, 0.05),
      new THREE.Vector3(0.12, 0.88, 0.02),
      new THREE.Vector3(-0.12, 1.18, -0.08),
      new THREE.Vector3(-0.38, 1.08, -0.15),
      new THREE.Vector3(-0.46, 0.55, -0.18),
    ]);
    return new THREE.TubeGeometry(curve, 28, 0.14, 16, false);
  }, []);

  // Pulmonary Trunk Vessel
  const pulmonaryGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, 0.35, 0.18),
      new THREE.Vector3(-0.25, 0.72, 0.12),
      new THREE.Vector3(0.2, 0.82, -0.05),
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.11, 14, false);
  }, []);

  // Branching Coronary Arteries
  const coronaryArteries = useMemo(() => {
    const curves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.02, 1.15, -0.05),
        new THREE.Vector3(0.08, 1.45, -0.02),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.15, 1.17, -0.08),
        new THREE.Vector3(-0.12, 1.48, -0.06),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.28, 1.12, -0.12),
        new THREE.Vector3(-0.32, 1.44, -0.1),
      ]),
    ];
    return curves.map((c) => new THREE.TubeGeometry(c, 12, 0.045, 10, false));
  }, []);

  // Flowing Blood Corpuscle Particles
  const bloodParticles = useMemo(() => {
    const count = 48;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 0.55 + Math.random() * 0.45;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * rad * 0.85;
      pos[i * 3 + 1] = Math.cos(phi) * rad * 0.9;
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * rad * 0.7;
    }
    return pos;
  }, []);

  // Materials
  const muscleMat = useMemo(() => {
    if (xray) {
      return new THREE.MeshPhysicalMaterial({
        color: '#059669',
        roughness: 0.15,
        transmission: 0.75,
        thickness: 1.2,
        emissive: '#10b981',
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.85,
      });
    }
    return new THREE.MeshPhysicalMaterial({
      color: '#b91c1c',
      roughness: 0.28,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      transmission: 0.15,
      thickness: 0.9,
      emissive: '#991b1b',
      emissiveIntensity: 0.22,
    });
  }, [xray]);

  const vesselMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: xray ? '#34d399' : '#dc2626',
      roughness: 0.2,
      clearcoat: 0.9,
      emissive: xray ? '#10b981' : '#b91c1c',
      emissiveIntensity: 0.25,
    });
  }, [xray]);

  const blueVesselMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: xray ? '#38bdf8' : '#2563eb',
      roughness: 0.2,
      clearcoat: 0.9,
      emissive: xray ? '#0ea5e9' : '#1d4ed8',
      emissiveIntensity: 0.25,
    });
  }, [xray]);

  // Heartbeat Contraction & Particle Orbit Loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const bps = (bpm || 72) / 60;
    const cycle = (time * bps) % 1;

    // Dual-Ventricular Contraction (Lub-Dub rhythm)
    let pulse = 1.0;
    if (cycle < 0.14) {
      pulse = 1.0 + Math.sin((cycle / 0.14) * Math.PI) * 0.07; // Atrial pump
    } else if (cycle > 0.18 && cycle < 0.38) {
      pulse = 1.0 + Math.sin(((cycle - 0.18) / 0.2) * Math.PI) * 0.12; // Ventricular surge
    }

    if (heartGroupRef.current) {
      heartGroupRef.current.scale.set(pulse * 0.96, pulse * 0.96, pulse * 0.96);
      heartGroupRef.current.rotation.y = Math.sin(time * 0.4) * 0.18;
    }

    if (bloodParticlesRef.current) {
      bloodParticlesRef.current.rotation.y = time * 0.6;
      bloodParticlesRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group position={[0, 0.15, 0]}>
      {/* Pulsing Anatomical Heart Body */}
      <group ref={heartGroupRef}>
        <mesh geometry={heartGeo} material={muscleMat} castShadow receiveShadow />
        <mesh geometry={aortaGeo} material={vesselMat} />
        <mesh geometry={pulmonaryGeo} material={blueVesselMat} />
        {coronaryArteries.map((geo, idx) => (
          <mesh key={idx} geometry={geo} material={vesselMat} />
        ))}
      </group>

      {/* Orbiting Blood Corpuscles */}
      <points ref={bloodParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bloodParticles.length / 3}
            array={bloodParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color={xray ? '#34d399' : '#ef4444'}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Interactive 3D Hotspot Tags */}
      {/* 1. Aorta Output Tag */}
      <Html position={[-0.48, 1.25, 0]} center distanceFactor={5.5}>
        <button
          onClick={() => onSelectHotspot('aorta')}
          onMouseEnter={() => setHoveredSpot('aorta')}
          onMouseLeave={() => setHoveredSpot(null)}
          className="group flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/95 border border-red-200 shadow-md hover:border-red-500 hover:scale-105 transition-all text-left cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-[10px] font-bold text-slate-800">
            Aorta • 5.1 L/min
          </span>
        </button>
      </Html>

      {/* 2. Myocardial Ventricle Tag */}
      <Html position={[0.75, -0.2, 0.45]} center distanceFactor={5.5}>
        <button
          onClick={() => onSelectHotspot('ventricle')}
          onMouseEnter={() => setHoveredSpot('ventricle')}
          onMouseLeave={() => setHoveredSpot(null)}
          className="group flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/95 border border-emerald-200 shadow-md hover:border-emerald-500 hover:scale-105 transition-all text-left cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-800">
            Ventricle • 64% EF
          </span>
        </button>
      </Html>
    </group>
  );
}

/**
 * 2. 3D Neural Brain & Synaptic Network (Neurology Institute)
 * Dual-hemisphere cerebral cortex with bioluminescent gyri and firing electric synapses
 */
function NeuralBrain3D({ onSelectHotspot }) {
  const brainRef = useRef();
  const sparksRef = useRef();

  // Dual Cerebral Hemispheres
  const hemisphereGeoL = useMemo(() => new THREE.SphereGeometry(0.72, 32, 28), []);
  const hemisphereGeoR = useMemo(() => new THREE.SphereGeometry(0.72, 32, 28), []);

  const cortexMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#38bdf8',
      transmission: 0.65,
      thickness: 1.1,
      roughness: 0.22,
      clearcoat: 0.9,
      emissive: '#0284c7',
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.92,
    });
  }, []);

  // Firing Synaptic Particles
  const synapseParticles = useMemo(() => {
    const count = 72;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 0.55 + Math.random() * 0.32;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * rad;
      pos[i * 3 + 1] = Math.cos(phi) * rad * 0.85;
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * rad;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (brainRef.current) {
      brainRef.current.rotation.y = time * 0.35;
      brainRef.current.position.y = 0.15 + Math.sin(time * 1.5) * 0.03;
    }
    if (sparksRef.current) {
      sparksRef.current.rotation.y = -time * 0.5;
    }
  });

  return (
    <group position={[0, 0.15, 0]}>
      <group ref={brainRef}>
        {/* Left Hemisphere */}
        <mesh
          geometry={hemisphereGeoL}
          material={cortexMat}
          position={[-0.38, 0, 0]}
          scale={[0.85, 0.95, 1.15]}
        />
        {/* Right Hemisphere */}
        <mesh
          geometry={hemisphereGeoR}
          material={cortexMat}
          position={[0.38, 0, 0]}
          scale={[0.85, 0.95, 1.15]}
        />

        {/* Brainstem & Cerebellum */}
        <mesh position={[0, -0.65, -0.2]} material={cortexMat}>
          <cylinderGeometry args={[0.22, 0.18, 0.55, 18]} />
        </mesh>
      </group>

      {/* Electric Synaptic Sparks */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={synapseParticles.length / 3}
            array={synapseParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color="#38bdf8"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Interactive Hotspot */}
      <Html position={[0.85, 0.5, 0]} center distanceFactor={5.5}>
        <button
          onClick={() => onSelectHotspot('neuro')}
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/95 border border-sky-200 shadow-md hover:border-sky-500 hover:scale-105 transition-all text-left cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
          <span className="text-[10px] font-bold text-slate-800">
            Synaptic Map • Normal
          </span>
        </button>
      </Html>
    </group>
  );
}

/**
 * 3. 3D Whole-Body Digital Twin (Diagnostic Scanner)
 * Translucent glassmorphic human silhouette with an animated vertical laser scan sweep
 */
function DigitalTwinBody3D({ onSelectHotspot }) {
  const laserRef = useRef();
  const bodyGroupRef = useRef();

  const hologramMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#10b981',
      transmission: 0.8,
      roughness: 0.15,
      thickness: 1.2,
      clearcoat: 1.0,
      emissive: '#059669',
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.82,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Vertical laser scanner sweep (-0.8 to +0.8)
    if (laserRef.current) {
      laserRef.current.position.y = Math.sin(time * 1.6) * 0.78;
    }
    if (bodyGroupRef.current) {
      bodyGroupRef.current.rotation.y = Math.sin(time * 0.4) * 0.25;
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* Human Silhouette Group */}
      <group ref={bodyGroupRef}>
        {/* Head */}
        <mesh position={[0, 0.75, 0]} material={hologramMat}>
          <sphereGeometry args={[0.2, 24, 24]} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.52, 0]} material={hologramMat}>
          <cylinderGeometry args={[0.08, 0.09, 0.14, 16]} />
        </mesh>
        {/* Chest & Torso */}
        <mesh position={[0, 0.22, 0]} material={hologramMat}>
          <cylinderGeometry args={[0.28, 0.22, 0.48, 20]} />
        </mesh>
        {/* Pelvis */}
        <mesh position={[0, -0.1, 0]} material={hologramMat}>
          <cylinderGeometry args={[0.22, 0.2, 0.22, 20]} />
        </mesh>
        {/* Left Arm */}
        <mesh position={[0.34, 0.18, 0]} rotation={[0, 0, -0.15]} material={hologramMat}>
          <cylinderGeometry args={[0.07, 0.05, 0.55, 16]} />
        </mesh>
        {/* Right Arm */}
        <mesh position={[-0.34, 0.18, 0]} rotation={[0, 0, 0.15]} material={hologramMat}>
          <cylinderGeometry args={[0.07, 0.05, 0.55, 16]} />
        </mesh>
        {/* Left Leg */}
        <mesh position={[0.13, -0.48, 0]} material={hologramMat}>
          <cylinderGeometry args={[0.08, 0.06, 0.62, 16]} />
        </mesh>
        {/* Right Leg */}
        <mesh position={[-0.13, -0.48, 0]} material={hologramMat}>
          <cylinderGeometry args={[0.08, 0.06, 0.62, 16]} />
        </mesh>
      </group>

      {/* Sweeping Laser Diagnostic Ring */}
      <mesh ref={laserRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.018, 16, 48]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.85} />
      </mesh>

      {/* Clickable Hotspots across organ systems */}
      <Html position={[0, 0.85, 0.2]} center distanceFactor={5.5}>
        <button
          onClick={() => onSelectHotspot('brain')}
          className="px-2 py-0.5 rounded-full bg-white/95 border border-emerald-300 text-[10px] font-bold text-slate-800 hover:scale-105 shadow-md transition-all cursor-pointer"
        >
          🧠 Brain
        </button>
      </Html>

      <Html position={[0, 0.25, 0.32]} center distanceFactor={5.5}>
        <button
          onClick={() => onSelectHotspot('heart')}
          className="px-2 py-0.5 rounded-full bg-white/95 border border-emerald-300 text-[10px] font-bold text-slate-800 hover:scale-105 shadow-md transition-all cursor-pointer"
        >
          ❤️ Heart
        </button>
      </Html>

      <Html position={[0, -0.5, 0.2]} center distanceFactor={5.5}>
        <button
          onClick={() => onSelectHotspot('ortho')}
          className="px-2 py-0.5 rounded-full bg-white/95 border border-emerald-300 text-[10px] font-bold text-slate-800 hover:scale-105 shadow-md transition-all cursor-pointer"
        >
          🦴 Mobility
        </button>
      </Html>
    </group>
  );
}

/**
 * 4. Architectural Clinical Diagnostic Pedestal & 3D Animated ECG Wave
 */
function DiagnosticPedestal() {
  const ecgRef = useRef();

  // 3D Circular Animated ECG Wave Curve
  const ecgGeo = useMemo(() => {
    const points = [];
    const r = 1.35;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      let y = -0.92;
      // Front ECG QRS Wave spike
      if (i >= 26 && i <= 38) {
        const p = (i - 26) / 12;
        if (p < 0.2) y -= 0.05;
        else if (p < 0.45) y += 0.38; // R peak
        else if (p < 0.7) y -= 0.18;  // S wave
        else if (p < 0.9) y += 0.09;  // T wave
      }
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, 128, 0.016, 8, true);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ecgRef.current) {
      ecgRef.current.rotation.y = time * 0.45;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Matte Clinical Stage Disc */}
      <mesh position={[0, -0.98, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.4, 0.06, 48]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Concentric Emerald Diagnostic Halo */}
      <mesh position={[0, -0.948, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.28, 0.01, 16, 64]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* 3D Animated ECG Wave Ribbon */}
      <mesh ref={ecgRef} geometry={ecgGeo}>
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.65}
          roughness={0.15}
        />
      </mesh>

      {/* Subtle Ambient Ground Ring */}
      <mesh position={[0, -0.99, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 36]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/**
 * Main Interactive Hospital 3D Scene
 */
export function HospitalScene() {
  const hospitalConfig = useVerticalStore((state) => state.hospitalCustomizer);
  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);
  const mode = hospitalConfig.explorerMode || 'heart';
  const bpm = hospitalConfig.bpm || 72;
  const xray = hospitalConfig.xrayMode || false;

  const handleSelectHotspot = (id) => {
    const messages = {
      aorta: "🩺 Aorta & Coronary Output: 5.1 L/min • Healthy arterial pressure 120/80 mmHg.",
      ventricle: "❤️ Myocardial Function: 64% Ejection Fraction • Optimal ventricular contractility.",
      neuro: "🧠 Neural Synapse Network: Optimal cognitive transmission • Emergency stroke response active.",
      brain: "🧠 Brain & Neurological Institute: Comprehensive Stroke Center • 24/7 neurovascular team.",
      heart: "❤️ Cardiovascular Care: Robotic cardiac bypass & structural heart interventions.",
      ortho: "🦴 Robotic Orthopedics: Joint preservation & minimally invasive spine care.",
    };
    updateHospital({
      telemetryMessage: messages[id] || "✨ Optimal clinical telemetry recorded.",
      activeHotspot: id,
    });
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main 3D Anatomical Organ / Twin */}
      {mode === 'heart' && (
        <BeatingHeart3D bpm={bpm} xray={xray} onSelectHotspot={handleSelectHotspot} />
      )}
      {mode === 'brain' && (
        <NeuralBrain3D onSelectHotspot={handleSelectHotspot} />
      )}
      {mode === 'body' && (
        <DigitalTwinBody3D onSelectHotspot={handleSelectHotspot} />
      )}

      {/* 2. Clinical Diagnostic Pedestal & ECG Ribbon */}
      <DiagnosticPedestal />

      {/* 3. Glassmorphic Telemetry Overlay Badges */}
      <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.35}>
        <Html position={[-1.25, 0.72, 0.2]} center distanceFactor={6}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-slate-900/5 select-none pointer-events-none whitespace-nowrap">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-slate-900 uppercase">
                {mode === 'heart' ? 'Cardiac Rhythm' : mode === 'brain' ? 'Neural Activity' : 'Digital Twin'}
              </div>
              <div className="text-[9px] font-semibold text-emerald-700">
                {mode === 'heart' ? `${bpm} BPM • Normal Sinus` : mode === 'brain' ? 'Alpha & Beta Waves Sync' : 'Full Scan Verified'}
              </div>
            </div>
          </div>
        </Html>
      </Float>

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.35}>
        <Html position={[1.25, 0.65, 0.2]} center distanceFactor={6}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-slate-900/5 select-none pointer-events-none whitespace-nowrap">
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center text-[10px] font-black border border-emerald-200/60">
              24h
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-slate-900 uppercase">
                Level-1 Verified
              </div>
              <div className="text-[9px] font-semibold text-emerald-700">
                Rapid Emergency Triage
              </div>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}
