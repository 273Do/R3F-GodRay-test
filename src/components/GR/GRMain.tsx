import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Lights } from "./Lights";
import { Model } from "./Model";
import { Effects } from "./Effects";

const GRMain = ({ className }: { className?: string }) => {
  return (
    <Canvas
      camera={{
        position: [0, -1.5, 3],
        fov: 50,
        near: 0.1,
        far: 2000,
      }}
      className={className || "w-full h-full"}
      dpr={window.devicePixelRatio}
      shadows
    >
      <color attach="background" args={["#000"]} />
      <OrbitControls />
      <Lights />
      <Suspense fallback={null}>
        <Model position={[0, 0, 0]} />
      </Suspense>
      <Effects />
    </Canvas>
  );
};

export default GRMain;
