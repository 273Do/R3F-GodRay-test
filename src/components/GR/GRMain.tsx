import {
  Scroll,
  ScrollControls,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Lights } from "./Lights";
import { Model } from "./Model";
import { Effects } from "./Effects";
import HTMLContents from "./HTMLContents";
import Text2D from "./Text2D";
import { useLocation } from "react-router-dom";
import { Vector3 } from "three";
import { RainLines, RainParticles } from "./Rain";

// 各ルートに対応するカメラ位置を定義
const cameraPositions = {
  "/": [-0.7, -2, 4.7],
  "/scene1": [0.44, -2.22, 1.46],
  "/scene2": [-0.8, -2.1, 0],
  "/scene3": [2.11, -0.3, 1.27],
  "/scene4": [0.47, 2.77, 2.01],
};

// イージング関数
const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3);
};

// Canvas内で使用するシーンコンポーネント
const Scene = () => {
  const { pathname } = useLocation();
  const { camera } = useThree();

  // アニメーション状態の管理
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef({
    startTime: 0,
    duration: 1000, // ミリ秒単位のアニメーション時間
    sourceCamera: [0, -1.5, 3],
    targetCamera: [0, -1.5, 3],
  });

  // パス変更を検知してアニメーション開始
  useEffect(() => {
    const targetPosition = cameraPositions[pathname] || [0, -1.5, 3];

    // 現在のカメラ位置を保存
    const currentPosition = [
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ];

    // アニメーション情報を更新
    animationRef.current = {
      startTime: Date.now(),
      duration: 1000,
      sourceCamera: currentPosition,
      targetCamera: targetPosition,
    };

    // アニメーション開始
    setIsAnimating(true);
  }, [pathname]); // パスが変わった時だけ実行

  // カメラアニメーションの更新
  useFrame(() => {
    console.log("カメラの位置", camera.position);
    console.log("カメラの回転", camera.rotation);
    if (!isAnimating) return;

    const { startTime, duration, sourceCamera, targetCamera } =
      animationRef.current;
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    // カメラの位置を補間
    const [srcX, srcY, srcZ] = sourceCamera;
    const [tgtX, tgtY, tgtZ] = targetCamera;

    camera.position.x = srcX + (tgtX - srcX) * eased;
    camera.position.y = srcY + (tgtY - srcY) * eased;
    camera.position.z = srcZ + (tgtZ - srcZ) * eased;

    camera.lookAt(0, 0, 0);

    // アニメーション完了判定
    if (progress >= 1) {
      setIsAnimating(false);
    }
  });

  return (
    <>
      <color attach="background" args={["#040404"]} />
      <OrbitControls
        // enableZoom={false}
        // enablePan={false}
        // アニメーション中はコントロールを無効化
        enabled={!isAnimating}
      />
      <Lights />
      {/* <HTMLContents /> */}
      <Text2D pathname={pathname} />
      <Suspense fallback={null}>
        <Model position={[0.5, 0, 1]} />
        <RainParticles count={1500} />
        <RainLines count={300} />
      </Suspense>
      <Effects />
      <SoftShadows samples={3} />
    </>
  );
};

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
      <Scene />
    </Canvas>
  );
};

export default GRMain;
