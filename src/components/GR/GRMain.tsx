import {
  Scroll,
  ScrollControls,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, use } from "react";
import { Lights } from "./Lights";
import { Model } from "./Model";
import { Effects } from "./Effects";
import HTMLContents from "./HTMLContents";
import Text2D from "./Text2D";
import { useLocation } from "react-router-dom";

const cameraPositions = {
  "/": [0, -1.5, 3],
  "/scene1": [5, 2, 5],
  "/scene2": [-5, 1, 3],
};

const GRMain = ({ className }: { className?: string }) => {
  const { pathname } = useLocation();

  // useFrame(() => {
  //   const [x, y, z] = cameraPos.get();
  //   camera.position.lerp(new Vector3(x, y, z), 0.05);
  //   camera.lookAt(0, 0, 0);
  // });

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
      <OrbitControls enableZoom={false} />
      <Lights />
      {/* <HTMLContents /> */}
      <Text2D pathname={pathname} />
      <Suspense fallback={null}>
        <Model position={[0, 0, 0]} />
      </Suspense>
      <Effects />
      <SoftShadows samples={3} />
    </Canvas>
  );
};

export default GRMain;
