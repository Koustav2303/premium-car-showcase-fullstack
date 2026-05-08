import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

const CarModel = ({ carColor, windowTint, headlightsOn }) => {
  // Add the Draco decoder path to the useGLTF hook. 
  // This automatically fetches the necessary web workers from a CDN to decompress the model instantly.
  const { scene, materials } = useGLTF('/models/car.glb', true, true, (loader) => {
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (!materials) return;

    if (materials['车漆']) {
      materials['车漆'].color.set(carColor);
      materials['车漆'].metalness = 0.7;
      materials['车漆'].roughness = 0.1;
      materials['车漆'].clearcoat = 1.0;
      materials['车漆'].clearcoatRoughness = 0.05;
    }

    Object.keys(materials).forEach((key) => {
      const mat = materials[key];
      const name = key.toLowerCase();

      if (name.includes('玻璃') || name.includes('glass') || name.includes('window')) {
        mat.transparent = true;
        if (windowTint === 'dark') {
          mat.color.set('#050505');
          mat.opacity = 0.8;
          mat.roughness = 0.0;
          mat.metalness = 0.1;
        } else {
          mat.color.set('#ffffff');
          mat.opacity = 0.2;
          mat.roughness = 0.0;
        }
      }

      if (name.includes('灯') || name.includes('light') || name.includes('emissive')) {
        if (headlightsOn) {
          mat.emissive = new THREE.Color('#ffffff');
          mat.emissiveIntensity = 5;
          mat.toneMapped = false;
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

// Preload the model using the same decoder path
useGLTF.preload('/models/car.glb', true, true, (loader) => {
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);
});

export default CarModel;