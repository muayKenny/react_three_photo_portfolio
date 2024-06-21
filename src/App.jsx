import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Viewfinder from './Viewfinder';
import { Leva } from 'leva';
import { isMobile } from 'react-device-detect';

export default function App({ count = 50, depth = 100 }) {
  return (
    <>
      <Leva collapsed hidden={isMobile} />
      <Canvas
        camera={{ near: 0.01, far: 110, fov: isMobile ? 70 : 50 }}
        gl={{ alpha: false }}
      >
        {!isMobile && <Viewfinder />}

        <Scene count={count} depth={depth} isMobile />
      </Canvas>
    </>
  );
}
