import * as THREE from 'three';
import { useRef, useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion-3d';
import {
  Environment,
  Float,
  Center,
  useMatcapTexture,
  Text3D,
  OrbitControls,
} from '@react-three/drei';
import { useControls } from 'leva';

import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

import { Perf } from 'r3f-perf';

import Fujifilm from './Fujifilm';

const AnimatedText3D = motion(Text3D);
const material = new THREE.MeshMatcapMaterial();

export default function Scene({ count, depth, isMobile }) {
  const [isClicked, setIsClicked] = useState(false);
  const textRef = useRef();

  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  const { fps, movable_camera } = useControls({
    fps: false,
    movable_camera: false,
  });

  useEffect(() => {
    matcapTexture.colorSpace = THREE.sRGBColorSpace;
    material.matcap = matcapTexture;
    // material.needsUpdate = true;
  }, [matcapTexture]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500); // Reset after animation duration
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.geometry.computeBoundingBox();
      const bbox = textRef.current.geometry.boundingBox;
      const centerX = (bbox.max.x + bbox.min.x) / 2;
      const centerY = (bbox.max.y + bbox.min.y) / 2;
      const centerZ = (bbox.max.z + bbox.min.z) / 2;
      textRef.current.position.set(-centerX, -centerY, -centerZ);
    }
  }, []);

  return (
    <>
      {movable_camera || isMobile ? <OrbitControls /> : null}
      {fps ? <Perf position='top-left' /> : null}
      <color attach='background' args={['#E6DBC9']} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset='dawn' />
        {Array.from({ length: count }, (_, i) => (
          <Fujifilm key={i} scale={0.02} z={-(i / count) * depth} />
        ))}

        <Float speed={3} rotationIntensity={1}>
          <Center>
            <group ref={textRef}>
              <AnimatedText3D
                material={material}
                font='/Danfo_Regular.json'
                size={0.65}
                height={0.2}
                curveSegments={15}
                bevelEnabled
                bevelThickness={0.2}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                onPointerOver={() => (document.body.style.cursor = 'pointer')}
                onPointerOut={() => (document.body.style.cursor = 'default')}
                onClick={handleClick}
                animate={{
                  y: isClicked ? [0, 0.2, 0] : 0,
                  scale: isClicked ? [1, 1.25, 1] : 1,
                  rotateZ: isClicked ? [0, -0.1, 0.1, 0] : 0, // Small rotation left and right
                }}
                transition={{
                  times: [0, 0.25, 0.5, 0.75, 1],
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
              >
                Kenny
              </AnimatedText3D>
            </group>
          </Center>
        </Float>

        <EffectComposer>
          <DepthOfField
            target={[0, 0, 20]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer>
      </Suspense>
    </>
  );
}
