import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function App({ count = 50, depth = 100 }) {
  return (
    <Canvas camera={{ near: 0.01, far: 110, fov: 30 }} gl={{ alpha: false }}>
      <Scene count={count} depth={depth} />
    </Canvas>
  );
}
