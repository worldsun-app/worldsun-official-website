import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

function FloatingShape({ position, geometry, color }: { 
  position: [number, number, number]; 
  geometry: string;
  color: string;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  const GeometryComponent = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.6, 16, 16]} />;
      case 'torus':
        return <torusGeometry args={[0.8, 0.3, 8, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      <GeometryComponent />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        wireframe={false}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} />
      
      {/* 更多幾何形狀，模仿 NOMAL 的豐富背景 */}
      <FloatingShape position={[-6, 3, -2]} geometry="box" color="#B73932" />
      <FloatingShape position={[5, -2, -3]} geometry="sphere" color="#00585C" />
      <FloatingShape position={[-3, -4, -1]} geometry="torus" color="#D4A574" />
      <FloatingShape position={[4, 4, -4]} geometry="octahedron" color="#B73932" />
      <FloatingShape position={[1, 2, -5]} geometry="box" color="#00585C" />
      <FloatingShape position={[-4, -2, -6]} geometry="sphere" color="#D4A574" />
      <FloatingShape position={[6, 1, -3]} geometry="torus" color="#B73932" />
      <FloatingShape position={[-5, 0, -4]} geometry="octahedron" color="#00585C" />
      <FloatingShape position={[2, -3, -2]} geometry="box" color="#D4A574" />
    </>
  );
}

const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default GeometricBackground;