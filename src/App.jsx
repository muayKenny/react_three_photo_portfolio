import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

function Fujifilm({ ...props }) {
  const { z } = props;
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const ref = useRef();

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.set(
        (data.rX += 0.0005),
        (data.rY += 0.001),
        (data.rZ += 0.0005)
      );
      ref.current.position.set(data.x * width, (data.y += 0.01), z);
      if (data.y > height) {
        data.y = -height;
      }
    }
  });

  const { nodes, materials } = useGLTF('camera_real-v1.glb');

  return (
    <group ref={ref} {...props} dispose={null}>
      {Object.keys(nodes).map((key, index) => {
        const node = nodes[key];
        const materialKey = node.material ? node.material.name : null;
        const material = materials[materialKey];

        if (node.geometry && material) {
          return (
            <mesh key={index} geometry={node.geometry} material={material} />
          );
        }

        return null;
      })}
    </group>
  );
}
export default function App({ count = 50, depth = 80 }) {
  return (
    <Canvas camera={{ near: 0.01, far: 110, fov: 30 }} gl={{ alpha: false }}>
      <color attach='background' args={['#85C6FC']} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset='dawn' />
        {Array.from({ length: count }, (_, i) => (
          <Fujifilm key={i} scale={0.02} z={-(i / count) * depth} />
        ))}
        <EffectComposer>
          <DepthOfField
            target={[0, 0, 20]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
