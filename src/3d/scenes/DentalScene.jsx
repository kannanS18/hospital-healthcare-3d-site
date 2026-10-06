import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

// Procedural Anatomical 3D Molar Tooth
function AnatomicalTooth({ whiteningGlow }) {
  const toothMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: whiteningGlow ? new THREE.Color('#FFFFFF') : new THREE.Color('#F7F6F0'),
      emissive: whiteningGlow ? new THREE.Color('#EDE9FE') : new THREE.Color('#000000'),
      emissiveIntensity: whiteningGlow ? 0.35 : 0.0,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.25, // Enamel light transmission
      thickness: 1.2,
      ior: 1.54, // Ceramic porcelain index of refraction
    });
  }, [whiteningGlow]);

  return (
    <group position={[0, 0, 0]}>
      {/* Crown Body with Cusps */}
      <mesh position={[0, 0.45, 0]} material={toothMaterial} castShadow>
        <cylinderGeometry args={[0.9, 0.75, 0.9, 32]} />
      </mesh>

      {/* 4 Anatomical Occlusal Cusps */}
      <mesh position={[-0.38, 0.9, -0.38]} material={toothMaterial}>
        <sphereGeometry args={[0.38, 24, 24]} />
      </mesh>
      <mesh position={[0.38, 0.9, -0.38]} material={toothMaterial}>
        <sphereGeometry args={[0.38, 24, 24]} />
      </mesh>
      <mesh position={[-0.38, 0.9, 0.38]} material={toothMaterial}>
        <sphereGeometry args={[0.38, 24, 24]} />
      </mesh>
      <mesh position={[0.38, 0.9, 0.38]} material={toothMaterial}>
        <sphereGeometry args={[0.38, 24, 24]} />
      </mesh>

      {/* Cervical Margin (Neck) */}
      <mesh position={[0, 0.02, 0]} material={toothMaterial}>
        <cylinderGeometry args={[0.75, 0.6, 0.4, 32]} />
      </mesh>

      {/* Bifurcated Roots (Root 1) */}
      <group position={[-0.26, -0.65, 0]} rotation={[0, 0, 0.12]}>
        <mesh material={toothMaterial} castShadow>
          <coneGeometry args={[0.32, 1.3, 24]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={toothMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      </group>

      {/* Bifurcated Roots (Root 2) */}
      <group position={[0.26, -0.65, 0]} rotation={[0, 0, -0.12]}>
        <mesh material={toothMaterial} castShadow>
          <coneGeometry args={[0.32, 1.3, 24]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={toothMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Dental Precision Mouth Mirror
function DentalMirror() {
  const metalMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#D1D5DB', metalness: 0.95, roughness: 0.15 }),
    []
  );
  const mirrorMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#A7F3D0', metalness: 0.9, roughness: 0.05, reflectivity: 1.0 }),
    []
  );

  return (
    <group scale={0.75}>
      {/* Handle */}
      <mesh position={[0, -1.2, 0]} material={metalMat}>
        <cylinderGeometry args={[0.045, 0.045, 2.2, 16]} />
      </mesh>
      {/* Angled Neck */}
      <mesh position={[0, 0.05, 0.08]} rotation={[0.4, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.038, 0.045, 0.35, 16]} />
      </mesh>
      {/* Mirror Frame Disc */}
      <mesh position={[0, 0.26, 0.22]} rotation={[0.6, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 32]} />
      </mesh>
      {/* Reflective Mirror Face */}
      <mesh position={[0, 0.27, 0.23]} rotation={[0.6, 0, 0]} material={mirrorMat}>
        <cylinderGeometry args={[0.32, 0.32, 0.02, 32]} />
      </mesh>
    </group>
  );
}

// 3D Dental Precision Explorer Probe
function DentalProbe() {
  const metalMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#E5E7EB', metalness: 0.95, roughness: 0.1 }),
    []
  );

  return (
    <group scale={0.75}>
      {/* Knurled Handle */}
      <mesh position={[0, -1.0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
      </mesh>
      {/* Tapered Tip */}
      <mesh position={[0, 0.1, 0.05]} rotation={[0.3, 0, 0]} material={metalMat}>
        <coneGeometry args={[0.035, 0.6, 16]} />
      </mesh>
    </group>
  );
}

export function DentalScene() {
  const groupRef = useRef();
  const toolsOrbitRef = useRef();
  const sparklesRef = useRef();
  const dentalConfig = useVerticalStore((state) => state.dentalCustomizer);

  // Diamond Sparkle Particles around Tooth
  const sparkleCount = 45;
  const sparkles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < sparkleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.3 + Math.random() * 1.5;
      arr.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 2.2 + 0.3,
        z: Math.sin(angle) * radius,
        scale: 0.04 + Math.random() * 0.05,
        twinkleSpeed: 2 + Math.random() * 4,
      });
    }
    return arr;
  }, []);

  // Animation Loop
  useFrame((state, delta) => {
    if (dentalConfig.autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }

    if (toolsOrbitRef.current && dentalConfig.orbitTools) {
      toolsOrbitRef.current.rotation.y -= delta * 0.45;
    }

    if (sparklesRef.current) {
      sparklesRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Central Rotating Tooth */}
      <group ref={groupRef}>
        <AnatomicalTooth whiteningGlow={dentalConfig.whiteningGlow} />

        {/* Whitening Cold Laser Ring */}
        {dentalConfig.laserScan && (
          <group position={[0, 0.5, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.05, 1.12, 64]} />
              <meshBasicMaterial color="#06B6D4" side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
            <pointLight color="#7C3AED" intensity={3} distance={2.8} />
          </group>
        )}
      </group>

      {/* Orbiting Precision Instruments */}
      {dentalConfig.orbitTools && (
        <group ref={toolsOrbitRef}>
          <group position={[2.2, 0.4, 0]} rotation={[0, 0, -0.4]}>
            <DentalMirror />
          </group>
          <group position={[-2.2, 0.2, 0]} rotation={[0, 0, 0.4]}>
            <DentalProbe />
          </group>
        </group>
      )}

      {/* Diamond Sparkle Particle Orbit */}
      <group ref={sparklesRef}>
        {sparkles.map((s, i) => (
          <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={1}>
            <mesh position={[s.x, s.y, s.z]}>
              <octahedronGeometry args={[s.scale, 0]} />
              <meshStandardMaterial
                color="#06B6D4"
                emissive="#A78BFA"
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Spa Porcelain Pedestal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <circleGeometry args={[4.5, 64]} />
        <meshStandardMaterial
          color="#FAF9F6"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Soft Violet Radiance Aura */}
      <pointLight color="#DDD6FE" intensity={4} distance={6} position={[0, -0.5, 0]} />
    </group>
  );
}
