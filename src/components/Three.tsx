import * as THREE from "three";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshRefractionMaterial,
  MeshTransmissionMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { NormalMapShader, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Three({ className }: { className?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 14, 0], fov: 17.5, near: 1, far: 20 }}
      className={className}
    >
      <color attach="background" args={["#950000"]} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />

      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <ThreeDModel />

      <EffectComposer>
        <Bloom
          intensity={10} // グローの強さ
          luminanceThreshold={0.02} // 発光の閾値
          luminanceSmoothing={1} // スムージング
          height={300} // 解像度
        />
      </EffectComposer>
    </Canvas>
  );
}

const ThreeDModel = () => {
  const { nodes } = useGLTF("/model/logo.glb");
  const ref = useRef(null);
  // useFrame(() => {
  //   if (ref.current) {
  //     ref.current.rotation.y += 0.01; // 回転
  //     ref.current.rotation.x += 0.01; // 回転
  //     ref.current.rotation.z += 0.01; // 回転
  //   }
  // });
  console.log(nodes);
  return (
    <>
      {/* そもそも一つにまとめるべき */}
      {Object.entries(nodes)
        .filter(([_, obj]) => obj.type === "Mesh")
        .map(([key, mesh]) => (
          <mesh
            key={key}
            geometry={(mesh as THREE.Mesh).geometry}
            scale={10}
            castShadow
            receiveShadow
            position={[-3, -5, -3]}
            ref={ref}
          >
            <meshStandardMaterial
              color={"#ffc5c5"} // 色
              roughness={0.5} // 粗さ（0で鏡面，1でマット）
              metalness={1} // 金属感（0で非金属，1で金属）
            />
            {/* <MeshTransmissionMaterial
              clearcoat={2}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8} // レンダリング時のサンプリング数（高いほど滑らか）
              resolution={512} // 屈折のテクスチャ解像度（高いほど詳細だが重い）
            /> */}
            <OrbitControls />
          </mesh>
        ))}
    </>
  );
};
