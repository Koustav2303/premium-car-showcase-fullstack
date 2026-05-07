import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

const CarModel = ({ carColor, windowTint, headlightsOn }) => {
  const { scene, materials } = useGLTF('/models/car.glb');

  useEffect(() => {
    if (!materials) return;

    // 1. Exterior Paint (Using the Chinese name we found earlier)
    if (materials['车漆']) {
      materials['车漆'].color.set(carColor);
      materials['车漆'].metalness = 0.7;
      materials['车漆'].roughness = 0.1;
      materials['车漆'].clearcoat = 1.0; // Adds a realistic clearcoat layer
      materials['车漆'].clearcoatRoughness = 0.05;
    }

    // 2. Dynamic Fallback Loop for Glass and Lights
    // We loop through all materials to find glass and lights based on common naming conventions
    Object.keys(materials).forEach((key) => {
      const mat = materials[key];
      const name = key.toLowerCase();

      // --- WINDOW TINT LOGIC ---
      if (name.includes('玻璃') || name.includes('glass') || name.includes('window')) {
        mat.transparent = true;
        if (windowTint === 'dark') {
          mat.color.set('#050505');
          mat.opacity = 0.8;
          mat.roughness = 0.0;
          mat.metalness = 0.1;
        } else {
          // Clear glass
          mat.color.set('#ffffff');
          mat.opacity = 0.2;
          mat.roughness = 0.0;
        }
      }

      // --- HEADLIGHTS (EMISSIVE) LOGIC ---
      if (name.includes('灯') || name.includes('light') || name.includes('emissive')) {
        if (headlightsOn) {
          mat.emissive = new THREE.Color('#ffffff');
          mat.emissiveIntensity = 5; // Glow intensity
          mat.toneMapped = false; // Prevents the glow from being washed out
        } else {
          mat.emissive = new THREE.Color('#000000');
          mat.emissiveIntensity = 0;
        }
      }
    });

  }, [carColor, windowTint, headlightsOn, materials]);

  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
      castShadow 
      receiveShadow
    />
  );
};

useGLTF.preload('/models/car.glb');

export default CarModel;