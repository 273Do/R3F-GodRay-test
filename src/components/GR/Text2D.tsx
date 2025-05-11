import { Billboard, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";

const Text2D = () => {
  const { viewport } = useThree(); // ビューポートの幅を取得
  const leftEdge = -viewport.width / 3; // 左端の位置を計算
  return (
    <mesh>
      <Billboard>
        <Text
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          position={[leftEdge + 0.3, 1, -1]}
        >
          Hello
        </Text>
        <Text
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          position={[-leftEdge - 0.3, -1, -1]}
        >
          World
        </Text>
      </Billboard>
    </mesh>
  );
};

export default Text2D;
