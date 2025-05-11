import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      <PointLight position={[0, 1, -2]} />
    </>
  );
};

type PointLightProps = {
  position: [number, number, number];
};

const PointLight = ({ position }: PointLightProps) => {
  const lightRef = useRef<THREE.Light>(null);

  useHelper(
    lightRef as React.RefObject<THREE.Object3D>,
    THREE.PointLightHelper,
    1
  );

  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (!scene.userData.refs) scene.userData.refs = {};
    scene.userData.refs.lightMesh = meshRef;
  }, [scene.userData]);

  useEffect(() => {
    meshRef.current!.lookAt(0, 0, 0);
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <circleGeometry args={[1, 128]} />
      <meshBasicMaterial color={"#460000"} side={THREE.DoubleSide} />
      <pointLight
        // ref={lightRef}
        color={"#ffffff"}
        intensity={10}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        castShadow
      />
    </mesh>
  );
};
