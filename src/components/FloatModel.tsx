import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Float = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      mesh.current.rotation.y += 0.01;
      mesh.current.position.y = Math.sin(time) * 0.2;
    }
  });

  return (
    <Cylinder ref={mesh} args={[0.2, 0.2, 1.5, 32]}>
      <meshStandardMaterial color={'#f0f0f0'} />
    </Cylinder>
  );
};

const FloatModel = () => {
  return (
    <Canvas style={{ height: '400px', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Float />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default FloatModel;