import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVerticalStore } from '../store/useVerticalStore';
import { THEMES } from '../themes';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader with procedural simplex noise dissolve and glowing edge
const fragmentShader = `
  uniform float uProgress;
  uniform vec3 uEdgeColor;
  uniform float uTime;
  varying vec2 vUv;

  // Simple pseudo-random hash
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 2D noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    if (uProgress <= 0.0 || uProgress >= 1.0) {
      discard;
    }

    vec2 uv = vUv * 6.0;
    float n = noise(uv + uTime * 0.1);
    
    // Wave threshold calculation
    float threshold = uProgress;
    float edgeWidth = 0.12;

    float dist = abs(n - threshold);

    if (n < threshold - edgeWidth) {
      discard;
    }

    // Glowing energy edge
    float edgeFactor = smoothstep(edgeWidth, 0.0, dist);
    vec3 color = mix(vec3(0.05, 0.05, 0.08), uEdgeColor * 2.5, edgeFactor);
    float alpha = edgeFactor * 0.95;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function TransitionShader() {
  const meshRef = useRef();
  const isTransitioning = useVerticalStore((state) => state.isTransitioning);
  const transitionProgress = useVerticalStore((state) => state.transitionProgress);
  const activeVertical = useVerticalStore((state) => state.activeVertical);

  const theme = THEMES[activeVertical] || THEMES.car;

  const uniforms = useMemo(() => {
    return {
      uProgress: { value: 0 },
      uEdgeColor: { value: new THREE.Color(theme.colors.primary) },
      uTime: { value: 0 },
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.material.uniforms.uProgress.value = isTransitioning ? transitionProgress : 0;
      meshRef.current.material.uniforms.uEdgeColor.value.set(theme.colors.primary);
    }
  });

  if (!isTransitioning) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0.9]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
