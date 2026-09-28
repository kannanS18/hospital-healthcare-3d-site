import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sliders, RotateCw, Activity, Cpu } from 'lucide-react';

function DiagnosticModel({ mode, scanBeam, wireframe, autoRotate }) {
  const groupRef = useRef();
  const scanRingRef = useRef();
  const dnaRef = useRef();

  const { scene } = useGLTF((import.meta.env.BASE_URL + 'models/LeePerrySmith.glb'));
  const headModel = useMemo(() => scene.clone(true), [scene]);

  const medicalMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0D9488'),
    emissive: new THREE.Color('#042F2E'),
    emissiveIntensity: 0.4,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.65,
    transparent: true,
    opacity: 0.85,
    wireframe: wireframe,
  }), [wireframe]);

  useMemo(() => {
    headModel.traverse((child) => {
      if (child.isMesh) {
        child.material = medicalMaterial;
        child.castShadow = true;
      }
    });
  }, [headModel, medicalMaterial]);

  const dnaNodes = useMemo(() => {
    const nodes = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4;
      const y = (i / count) * 4 - 2;
      const radius = 1.1;
      nodes.push({
        posA: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        posB: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
      });
    }
    return nodes;
  }, []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 70; i++) {
      arr.push({
        pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4 + 0.5, (Math.random() - 0.5) * 6],
        scale: 0.04 + Math.random() * 0.05,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (scanRingRef.current && scanBeam) {
      scanRingRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 1.2 + 0.3;
    }
    if (dnaRef.current) {
      dnaRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      <group ref={groupRef}>
        {mode === 'cranial' ? (
          <group position={[0, 0.1, 0]}>
            <primitive object={headModel} scale={0.4} position={[0, -0.5, 0]} />
          </group>
        ) : (
          <group position={[0, 0.4, 0]}>
            <mesh>
              <sphereGeometry args={[0.9, 32, 32]} />
              <meshPhysicalMaterial color="#0D9488" roughness={0.15} transmission={0.7} thickness={1.5} emissive="#0F766E" emissiveIntensity={0.5} wireframe={wireframe} />
            </mesh>
            <group ref={dnaRef}>
              {dnaNodes.map((n, i) => (
                <group key={i}>
                  <mesh position={n.posA}><sphereGeometry args={[0.07, 16, 16]} /><meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.6} /></mesh>
                  <mesh position={n.posB}><sphereGeometry args={[0.07, 16, 16]} /><meshStandardMaterial color="#0D9488" emissive="#0D9488" emissiveIntensity={0.6} /></mesh>
                  {i % 2 === 0 && (
                    <line>
                      <bufferGeometry><bufferAttribute attach="attributes-position" count={2} array={new Float32Array([...n.posA, ...n.posB])} itemSize={3} /></bufferGeometry>
                      <lineBasicMaterial color="#38BDF8" transparent opacity={0.4} />
                    </line>
                  )}
                </group>
              ))}
            </group>
          </group>
        )}

        {scanBeam && (
          <group ref={scanRingRef} position={[0, 0.3, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.3, 1.38, 64]} />
              <meshBasicMaterial color="#38BDF8" side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
            <pointLight color="#38BDF8" intensity={2.5} distance={2.5} />
          </group>
        )}
      </group>

      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={p.pos}>
            <dodecahedronGeometry args={[p.scale, 0]} />
            <meshStandardMaterial color="#0D9488" emissive="#14B8A6" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
        </Float>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.1} metalness={0.1} />
      </mesh>
      <group position={[0, -0.89, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[1.2, 2.2, 3.4].map((r, i) => (
          <mesh key={i}><ringGeometry args={[r, r + 0.02, 64]} /><meshBasicMaterial color="#0D9488" transparent opacity={0.25} /></mesh>
        ))}
      </group>
    </group>
  );
}

// useGLTF.preload handled at runtime;

export function HospitalCanvas() {
  const [mode, setMode] = useState('molecular');
  const [scanBeam, setScanBeam] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [toolbarOpen, setToolbarOpen] = useState(false);

  return (
    <div className="relative w-full h-[650px] md:h-[750px] lg:h-[820px] overflow-hidden select-none">
      <Canvas shadows camera={{ position: [0, 1.2, 4.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={<Html center><div className="text-xs font-mono text-[#0D9488]">SYNTHESIZING CLINICAL SCAN...</div></Html>}>
          <Environment preset="studio" environmentIntensity={0.6} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <DiagnosticModel mode={mode} scanBeam={scanBeam} wireframe={wireframe} autoRotate={autoRotate} />
          <OrbitControls enablePan={false} minDistance={2.2} maxDistance={7.5} maxPolarAngle={Math.PI / 2 - 0.05} dampingFactor={0.05} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={() => setToolbarOpen(!toolbarOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-panel shadow-lg hover:border-[#0D9488] transition-all group"
        >
          <Sliders className="w-4 h-4 text-[#0D9488]" />
          <span className="text-xs font-semibold tracking-wider uppercase font-heading text-[#0F172A]">Diagnostic Matrix Controls</span>
          <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
        </button>

        {toolbarOpen && (
          <div className="mt-3 p-5 rounded-2xl glass-panel shadow-2xl border border-[#0D9488]/40 w-80 space-y-4">
            <div className="flex items-center justify-between border-b border-[#0D9488]/20 pb-2">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0D9488] font-heading">Diagnostic Mode Deck</span>
              <button onClick={() => setToolbarOpen(false)} className="text-gray-500 hover:text-black text-xs">✕</button>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase block mb-1.5 font-mono">Target Scan Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('molecular')}
                  className={`py-1.5 text-xs font-heading font-semibold rounded-lg border text-center transition-all ${mode === 'molecular' ? 'border-[#0D9488] bg-[#0D9488]/20 text-[#0F172A] font-bold' : 'border-gray-200 text-gray-600'}`}
                >
                  🧬 Cellular DNA
                </button>
                <button
                  onClick={() => setMode('cranial')}
                  className={`py-1.5 text-xs font-heading font-semibold rounded-lg border text-center transition-all ${mode === 'cranial' ? 'border-[#0D9488] bg-[#0D9488]/20 text-[#0F172A] font-bold' : 'border-gray-200 text-gray-600'}`}
                >
                  🧠 Cranial Scan
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200">
              <span>Laser Scanning Beam</span>
              <input type="checkbox" checked={scanBeam} onChange={e => setScanBeam(e.target.checked)} className="accent-[#0D9488]" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Holographic Wireframe</span>
              <input type="checkbox" checked={wireframe} onChange={e => setWireframe(e.target.checked)} className="accent-[#0D9488]" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Auto Rotate 360</span>
              <input type="checkbox" checked={autoRotate} onChange={e => setAutoRotate(e.target.checked)} className="accent-[#0D9488]" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
    </div>
  );
}