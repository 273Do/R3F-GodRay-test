import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

// 雨のパーティクルコンポーネント
export function RainParticles({ count = 1000 }) {
  const meshRef = useRef(null);
  const velocityRef = useRef(null);

  // パーティクルの初期位置と速度を設定
  const [positions, velocity] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocity = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // ランダムな初期位置
      positions[i3] = (Math.random() - 0.5) * 40; // x
      positions[i3 + 1] = Math.random() * 40 + 20; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 40; // z

      // 雨粒の落下速度
      velocity[i3] = (Math.random() - 0.5) * 0.1; // x方向の風
      velocity[i3 + 1] = -Math.random() * 0.3 - 0.2; // y方向（落下）
      velocity[i3 + 2] = (Math.random() - 0.5) * 0.1; // z方向の風
    }

    return [positions, velocity];
  }, [count]);

  velocityRef.current = velocity;

  // アニメーションループ
  useFrame(() => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array;
    const velocity = velocityRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 位置を更新
      positions[i3] += velocity[i3];
      positions[i3 + 1] += velocity[i3 + 1];
      positions[i3 + 2] += velocity[i3 + 2];

      // 地面に到達したら上部にリセット
      if (positions[i3 + 1] < -5) {
        positions[i3] = (Math.random() - 0.5) * 40;
        positions[i3 + 1] = Math.random() * 20 + 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 40;
      }

      // 水平方向の境界チェック
      if (Math.abs(positions[i3]) > 20) {
        positions[i3] = (Math.random() - 0.5) * 40;
      }
      if (Math.abs(positions[i3 + 2]) > 20) {
        positions[i3 + 2] = (Math.random() - 0.5) * 40;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        vertexColors={false}
      />
    </points>
  );
}

// より線状の雨粒を作るコンポーネント
export function RainLines({ count = 500 }) {
  const meshRef = useRef(null);
  const velocityRef = useRef(null);

  const [positions, velocity] = useMemo(() => {
    const positions = new Float32Array(count * 7); // 各線は2点
    const velocity = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i6 = i * 6;

      const x = (Math.random() - 0.5) * 40;
      const y = 20;
      const z = (Math.random() - 0.5) * 40;

      // 線の始点
      positions[i6] = x;
      positions[i6 + 1] = y;
      positions[i6 + 2] = z;

      // 線の終点（少し下）
      positions[i6 + 3] = x;
      positions[i6 + 4] = y - 1;
      positions[i6 + 5] = z;

      velocity[i3] = (Math.random() - 0.5) * 0.1;
      velocity[i3 + 1] = -Math.random() * 0.3 - 0.2;
      velocity[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    return [positions, velocity];
  }, [count]);

  velocityRef.current = velocity;

  useFrame(() => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array;
    const velocity = velocityRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i6 = i * 6;

      // 両端の点を同時に移動
      positions[i6] += velocity[i3];
      positions[i6 + 1] += velocity[i3 + 1];
      positions[i6 + 2] += velocity[i3 + 2];

      positions[i6 + 3] += velocity[i3];
      positions[i6 + 4] += velocity[i3 + 1];
      positions[i6 + 5] += velocity[i3 + 2];

      // リセット条件
      if (positions[i6 + 1] < -5) {
        const x = (Math.random() - 0.5) * 40;
        const y = Math.random() * 20 + 20;
        const z = (Math.random() - 0.5) * 40;

        positions[i6] = x;
        positions[i6 + 1] = y;
        positions[i6 + 2] = z;
        positions[i6 + 3] = x;
        positions[i6 + 4] = y - 0.5;
        positions[i6 + 5] = z;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={1} />
    </lineSegments>
  );
}
