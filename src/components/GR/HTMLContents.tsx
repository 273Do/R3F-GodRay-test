import { Html } from "@react-three/drei";
import React from "react";
import { MeshStandardMaterial } from "three";

const HTMLContents = () => {
  return (
    <Html
      transform
      prepend
      scale={0.5}
      // occlude={true} // occlude を有効にする
      position={[0, 0, -1]}
      zIndexRange={[20, 0]}
      style={{
        background: "transparent", // 背景を透過
        pointerEvents: "none", // ポインターイベントを無効化
      }}
      occlude="blending"
      // castShadow
      // receiveShadow

      // prepend
      // center
      // fullscreen
      // distanceFactor={10}

      // sprite
    >
      <div
        style={{
          background: "transparent",
          padding: "0px",
          margin: "0px",
          width: "100%",
          height: "100%",
          color: "white",
        }}
      >
        <p style={{ fontSize: "2.8em", background: "transparent" }}>test</p>
      </div>
    </Html>
  );
};

export default HTMLContents;
