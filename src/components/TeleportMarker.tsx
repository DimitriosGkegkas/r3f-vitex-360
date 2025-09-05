import * as THREE from "three";
import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

/**
 * DissolveMaterial — vertical alpha falloff (top fades out)
 * - color: base glow color
 * - height: cylinder height used for normalization
 * - opacity: overall opacity multiplier
 * - power: curve shaping for falloff (higher -> sharper fade near top)
 * - time: for subtle shimmer animation
 */
const DissolveMaterial = shaderMaterial(
  {
    color: new THREE.Color(0x1088F4),
    height: 2.0,
    opacity: 0.9,
    power: 1.35,
    time: 0,
  },
  // vertex shader
  /* glsl */ `
  uniform float height;
  varying float vT;     // 0 at bottom -> 1 at top
  varying vec3 vWorldPos;
  void main() {
    // CylinderGeometry is centered at y=0 with range [-h/2, h/2]
    vT = (position.y + height * 0.5) / height;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
  `,
  // fragment shader
  /* glsl */ `
  uniform vec3 color;
  uniform float opacity;
  uniform float power;
  uniform float time;
  varying float vT;
  varying vec3 vWorldPos;

  // Simple noise-ish shimmer using trig (fast & branchless)
  float shimmer(vec3 p) {
    return 0.5 + 0.5 * (
      sin(p.x * 6.3 + time * 1.2) * 0.33 +
      sin(p.y * 10.0 + time * 1.7) * 0.33 +
      sin(p.z * 7.1 + time * 1.1) * 0.34
    );
  }

  void main() {
    // Base vertical dissolve: fully visible at bottom, fades toward top
    float a = clamp(1.0 - vT, 0.0, 1.0);
    a = pow(a, power);

    // Add a subtle shimmer modulation that is stronger near the top edge
    float s = mix(0.95, 1.15, shimmer(vWorldPos * 0.5));
    a *= s;

    // Soft clamp to avoid harsh transparency cutoff
    a = smoothstep(0.0, 1.0, a);

    // Final color — premultiply for additive-looking result under Bloom
    vec3 col = color * 1.0; // keep bright; Bloom will do the magic

    gl_FragColor = vec4(col, a * opacity);
    if (gl_FragColor.a < 0.01) discard; // clean edges for postprocessing
  }
  `
);

// Register the custom material with React Three Fiber
// eslint-disable-next-line react-refresh/only-export-components
export { DissolveMaterial };

interface RingBaseProps {
  radius?: number;
  thickness?: number;
  color?: number;
}

function RingBase({ radius = 0.5, thickness = 0.04, color = 0x1088F4 }: RingBaseProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ringRef.current) return;
    // Gentle pulsing scale & slight rotation for life
    const pulse = 1 + Math.sin(t * 2.0) * 0.03;
    ringRef.current.scale.set(pulse, 1, pulse);
    ringRef.current.rotation.x = -Math.PI / 2; // flat on the ground
  });

  return (
    <group>
      {/* Glowing ring */}
      <mesh ref={ringRef} position={[0, 0.01, 0]}>
        <ringGeometry args={[radius - thickness, radius, 128]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={3.0}
          metalness={0}
          roughness={0.35}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Faint inner disc for center glow */}
      <mesh position={[0, 0.009, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[radius - thickness, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface EnergyPillarProps {
  height?: number;
  radius?: number;
  color?: number;
}

function EnergyPillar({ height = 2, radius = 0.3, color = 0x1088F4 }: EnergyPillarProps) {
  const matRef = useRef<THREE.ShaderMaterial & { time?: number }>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (matRef.current) matRef.current.time = t;
    if (meshRef.current) meshRef.current.rotation.y = t * 0.25;
  });

  return (
    <mesh ref={meshRef} position={[0, height / 2, 0]}>
      {/* tip: more radial segments -> smoother */}
      <cylinderGeometry args={[radius, radius, height, 64, 1, true]} />
      {/* custom dissolve material */}
      <dissolveMaterial
        ref={matRef}
        attach="material"
        color={new THREE.Color(color)}
        height={height}
        opacity={0.9}
        power={1.2}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Extend so <dissolveMaterial /> is recognized as a JSX intrinsic element
extend({ DissolveMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dissolveMaterial: any;
    }
  }
}

interface TeleportMarkerProps {
  color?: number;
  onPointerOver?: (event: any) => void;
  onPointerOut?: (event: any) => void;
  onClick?: (event: any) => void;
}

function TeleportMarker({ color, onPointerOver, onPointerOut, onClick }: TeleportMarkerProps) {
  return (
    <group onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
      <RingBase color={color} />
      <EnergyPillar color={color} />
    </group>
  );
}

export default TeleportMarker;