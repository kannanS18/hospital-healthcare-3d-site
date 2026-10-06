import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

export function RealEstateScene() {
  const groupRef = useRef();
  const realEstateConfig = useVerticalStore((state) => state.realEstateCustomizer);

  // Load official Three.js architectural complex
  const { scene, animations } = useGLTF('/models/LittlestTokyo.glb');
  const buildingModel = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, groupRef);

  // Start building animations (train, fans, signs)
  useEffect(() => {
    if (actions) {
      const firstAction = Object.values(actions)[0];
      if (firstAction) {
        firstAction.play();
      }
    }
  }, [actions]);

  // Sunset / Day / Night Lighting Colors
  const lighting = useMemo(() => {
    switch (realEstateConfig.timeOfDay) {
      case 'night':
        return {
          sunColor: '#38BDF8',
          sunIntensity: 0.8,
          ambientColor: '#0F172A',
          ambientIntensity: 0.6,
          windowGlowColor: '#F59E0B',
          windowGlowIntensity: 6,
        };
      case 'day':
        return {
          sunColor: '#FFFBEB',
          sunIntensity: 3.5,
          ambientColor: '#E0F2FE',
          ambientIntensity: 1.2,
          windowGlowColor: '#FEF3C7',
          windowGlowIntensity: 2,
        };
      case 'sunset':
      default:
        return {
          sunColor: '#F59E0B',
          sunIntensity: 3.8,
          ambientColor: '#451A03',
          ambientIntensity: 1.0,
          windowGlowColor: '#D97706',
          windowGlowIntensity: 5,
        };
    }
  }, [realEstateConfig.timeOfDay]);

  // Golden Dust Particles in Air
  const particleCount = 65;
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < particleCount; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 5 + 0.2,
        z: (Math.random() - 0.5) * 8,
        speedY: 0.005 + Math.random() * 0.015,
        speedX: (Math.random() - 0.5) * 0.008,
      });
    }
    return arr;
  }, []);

  const particlesRef = useRef();

  // Animation Loop
  useFrame((state, delta) => {
    if (realEstateConfig.autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }

    // Animate golden dust motes
    if (particlesRef.current && realEstateConfig.goldenHourParticles) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        let y = positions[i * 3 + 1];
        y += particles[i].speedY;
        if (y > 5.5) y = 0.2;
        positions[i * 3 + 1] = y;

        positions[i * 3] += particles[i].speedX;
        if (Math.abs(positions[i * 3]) > 4) positions[i * 3] *= -0.9;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Dynamic Sunlight / Sunset Beam */}
      <directionalLight
        color={lighting.sunColor}
        intensity={lighting.sunIntensity}
        position={[6, 8, 4]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight color={lighting.ambientColor} intensity={lighting.ambientIntensity} />

      {/* Central Rotating Architectural Model */}
      <group ref={groupRef} position={[0, 0, 0]}>
        <primitive object={buildingModel} scale={0.005} position={[0, 0, 0]} />

        {/* Warm Window Glow Lights */}
        {realEstateConfig.interiorLights && (
          <>
            <pointLight
              color={lighting.windowGlowColor}
              intensity={lighting.windowGlowIntensity}
              distance={4}
              position={[0, 1.2, 0]}
            />
            <pointLight
              color="#FBBF24"
              intensity={lighting.windowGlowIntensity * 0.8}
              distance={3.5}
              position={[0.8, 2.0, 0.5]}
            />
          </>
        )}
      </group>

      {/* Floating Golden Dust Particles */}
      {realEstateConfig.goldenHourParticles && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={new Float32Array(particles.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#E5C583"
            size={0.08}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Architectural Concrete / Marble Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial
          color="#121316"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Golden Boundary Grid Accent */}
      <gridHelper args={[18, 18, '#C9A96E', '#22252A']} position={[0, 0.005, 0]} />
    </group>
  );
}

useGLTF.preload('/models/LittlestTokyo.glb');
