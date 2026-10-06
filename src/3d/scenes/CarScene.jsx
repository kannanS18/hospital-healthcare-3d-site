import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

export function CarScene() {
  const groupRef = useRef();
  const carConfig = useVerticalStore((state) => state.carCustomizer);
  
  // Load official Ferrari 458 model
  const { scene } = useGLTF('/models/ferrari.glb');

  // Clone scene so we don't mutate the cached version
  const carScene = useMemo(() => scene.clone(true), [scene]);

  // Materials setup
  const bodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(carConfig.color),
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });
  }, [carConfig.color]);

  const wheelMaterial = useMemo(() => {
    let color = '#D4AF37'; // gold
    if (carConfig.wheelFinish === 'black') color = '#111111';
    if (carConfig.wheelFinish === 'silver') color = '#E0E0E0';

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.9,
      roughness: 0.2,
    });
  }, [carConfig.wheelFinish]);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#111827'),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.7,
    });
  }, []);

  const headlightMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: carConfig.headlights ? new THREE.Color('#FFFFFF') : new THREE.Color('#444444'),
    });
  }, [carConfig.headlights]);

  // Apply materials to car parts
  useEffect(() => {
    carScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === 'body' || child.material?.name === 'Body_Color') {
          child.material = bodyMaterial;
        } else if (child.name.includes('rim') || child.name.includes('wheel')) {
          child.material = wheelMaterial;
        } else if (child.name.includes('glass') || child.material?.name?.includes('Glass')) {
          child.material = glassMaterial;
        } else if (child.name.includes('light') || child.name === 'leds') {
          child.material = headlightMaterial;
        }
      }
    });
  }, [carScene, bodyMaterial, wheelMaterial, glassMaterial, headlightMaterial]);

  // Sparks particles
  const particleCount = 70;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 3,
        z: (Math.random() - 0.5) * 8,
        speedY: 0.01 + Math.random() * 0.02,
        speedX: (Math.random() - 0.5) * 0.01,
        size: 0.03 + Math.random() * 0.04,
      });
    }
    return temp;
  }, []);

  const particlesRef = useRef();

  // Animation frame
  useFrame((state, delta) => {
    if (carConfig.autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }

    // Animate sparks
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        let y = positions[i * 3 + 1];
        y += particles[i].speedY;
        if (y > 3.5) y = 0.05;
        positions[i * 3 + 1] = y;

        positions[i * 3] += particles[i].speedX;
        if (Math.abs(positions[i * 3]) > 4) positions[i * 3] *= -0.9;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Central Rotating Car */}
      <group ref={groupRef}>
        <primitive object={carScene} scale={0.9} position={[0, 0, 0]} />

        {/* Headlight Cones */}
        {carConfig.headlights && (
          <group position={[0, 0.4, 2.2]}>
            <spotLight
              color="#FFF5EA"
              intensity={4}
              angle={0.6}
              penumbra={0.5}
              position={[-0.7, 0, 0]}
              target-position={[-0.7, -0.5, 6]}
            />
            <spotLight
              color="#FFF5EA"
              intensity={4}
              angle={0.6}
              penumbra={0.5}
              position={[0.7, 0, 0]}
              target-position={[0.7, -0.5, 6]}
            />
          </group>
        )}

        {/* Neon Underglow */}
        {carConfig.underglow && (
          <pointLight
            color={carConfig.color}
            intensity={5}
            distance={3.5}
            decay={2}
            position={[0, 0.08, 0]}
          />
        )}
      </group>

      {/* Sparks Particle System */}
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
          color="#FF6B2B"
          size={0.06}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dark Garage Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#060607"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Grid Lines */}
      <gridHelper args={[20, 20, '#FF4D00', '#222222']} position={[0, 0.005, 0]} />
    </group>
  );
}

useGLTF.preload('/models/ferrari.glb');
