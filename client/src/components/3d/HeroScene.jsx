import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Center, ContactShadows, Environment } from '@react-three/drei';

const FashionElement = ({ position, rotation, color, type }) => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={position}>
      <mesh rotation={rotation} castShadow receiveShadow>
        {type === 'torus' && <torusGeometry args={[1, 0.3, 16, 32]} />}
        {type === 'cone' && <coneGeometry args={[1, 2, 32]} />}
        {type === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
      </mesh>
    </Float>
  );
};

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
        <Environment preset="city" />
        
        <Center>
          <group position={[0, -0.5, 0]}>
            <FashionElement position={[-1.5, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]} color="#D81B60" type="torus" />
            <FashionElement position={[1.5, 0.5, -1]} rotation={[0, Math.PI / 4, 0]} color="#F48FB1" type="sphere" />
            <FashionElement position={[0, 1, 1]} rotation={[Math.PI / 8, 0, Math.PI / 4]} color="#7B2CBF" type="cone" />
          </group>
        </Center>

        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
