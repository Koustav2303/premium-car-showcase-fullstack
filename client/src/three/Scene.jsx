import { Environment, ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import CarModel from './CarModel';

const Scene = ({ carColor, windowTint, headlightsOn, environmentMap }) => {
  const controlsRef = useRef();

  // Slowly auto-rotate the camera for a cinematic feel, but stop if the user interacts
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[6, 2, 6]} fov={40} />
      
      <OrbitControls 
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={9}
        maxPolarAngle={Math.PI / 2 - 0.05} // Floor boundary
        autoRotate={true}
        autoRotateSpeed={0.5}
        dampingFactor={0.05} // Smooth rotation physics
      />

      {/* Lighting adjusts based on the environment */}
      <ambientLight intensity={environmentMap === 'night' ? 0.1 : 0.6} />
      
      {/* Cinematic Spotlight */}
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={environmentMap === 'night' ? 2 : 0.8} 
        castShadow 
        shadow-bias={-0.0001}
      />

      {/* Dynamic HDRI Environment */}
      <Environment preset={environmentMap} blur={environmentMap === 'studio' ? 0.2 : 0.8} />

      {/* Ultra-realistic soft contact shadows */}
      <ContactShadows 
        resolution={2048} 
        scale={20} 
        blur={environmentMap === 'night' ? 3 : 1.5} 
        opacity={environmentMap === 'night' ? 0.8 : 0.4} 
        far={10} 
        color="#000000" 
      />

      <Suspense fallback={null}>
        <CarModel 
          carColor={carColor} 
          windowTint={windowTint} 
          headlightsOn={headlightsOn} 
        />
      </Suspense>
    </>
  );
};

export default Scene;