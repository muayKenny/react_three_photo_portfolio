import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Viewfinder from './Viewfinder';
import { Leva } from 'leva';

export default function App({ count = 50, depth = 100 }) {
  return (
    <>
      <Leva
        collapsed
        titleBar={{ title: 'Controls', position: { x: -75, y: 675 } }}
      />
      <Canvas camera={{ near: 0.01, far: 110, fov: 70 }} gl={{ alpha: false }}>
        <Viewfinder />

        <Scene count={count} depth={depth} />
      </Canvas>
    </>
  );
}
