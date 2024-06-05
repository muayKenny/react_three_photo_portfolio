import * as THREE from 'three';
import { useRef, useState, Suspense, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Fujifilm = ({ ...props }) => {
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
      ref.current.position.set(data.x * width, (data.y += 0.01), z - 1);
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
};

export default Fujifilm;
