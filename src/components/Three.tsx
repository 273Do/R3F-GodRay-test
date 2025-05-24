import * as THREE from "three";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls, useGLTF } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function Three({ className }: { className?: string }) {
  return (
    <>
      <Canvas
        camera={{ position: [0, 10, 5], fov: 45 }}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: true,
          stencil: true,
          depth: true,
        }}
        className={className || "w-full h-full"}
      >
        <ThreeDModel />
        {/* 光源 - 複数のライトを追加 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, 0]} intensity={10} color="#7c6e16" />
        {/* 後ろから差し込む光源と、2D文字を後ろに入れたい */}

        {/* 背景色 - 明るめの色に変更 */}
        <color attach="background" args={["#5f0000"]} />
        {/* 操作コントロール */}
        <OrbitControls enableZoom={true} enablePan={true} />
        {/* エフェクト - 軽減した設定 */}
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            opacity={1}
            intensity={0.25}
          />
          <Noise opacity={0.1} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </>
  );
}

const ThreeDModel = () => {
  const { nodes } = useGLTF("/model/logo.glb");
  const ref = useRef(null);

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
            scale={20}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            ref={ref}
          >
            <MeshDistortMaterial
              // ref={set}
              // envMap={envMap}
              // bumpMap={bumpMap}
              color={"#976400"}
              roughness={0.2}
              metalness={1}
              bumpScale={0.005}
              clearcoat={1}
              clearcoatRoughness={1}
              radius={1}
              distort={0.4}
            />
          </mesh>
        ))}
    </>
  );
};
