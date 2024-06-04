import * as THREE from 'three';
import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  Text,
  Center,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { Perf } from 'r3f-perf';

const material = new THREE.MeshMatcapMaterial();

function Fujifilm({ ...props }) {
  const { z } = props;
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const ref = useRef();
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.sRGBColorSpace;
    material.matcap = matcapTexture;
    material.needUpdate = true;
  }, []);

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
export default function App({ count = 50, depth = 100 }) {
  return (
    <Canvas camera={{ near: 0.01, far: 110, fov: 30 }} gl={{ alpha: false }}>
      <Perf position='top-left' />
      <color attach='background' args={['#E6DBC9']} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset='dawn' />
        {Array.from({ length: count }, (_, i) => (
          <Fujifilm key={i} scale={0.02} z={-(i / count) * depth} />
        ))}

        {/* <Text
          font='../public/Danfo-Regular.woff'
          fontSize={1}
          depth={0.2}
          rotateX={3}
          anchorX='center'
          anchorY='middle'
        >
          Kennys
        </Text> */}
        <Center>
          <Text3D
            font='../public/Danfo_Regular.json'
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.2}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            material={material}
          >
            Kenny
          </Text3D>
        </Center>

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
