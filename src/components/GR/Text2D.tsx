import { Billboard, Scroll, ScrollControls, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Text2D = ({ pathname }: { pathname: string }) => {
  const { viewport } = useThree(); // ビューポートの幅を取得
  const leftEdge = -viewport.width / 3; // 左端の位置を計算

  // pathnameごとのテキストと位置をマッピング
  const textMap: {
    [key: string]: { text: string; position: [number, number, number] }[];
  } = {
    "/": [
      { text: "Hello", position: [leftEdge + 0.3, 1, -1] },
      { text: "World", position: [-leftEdge - 0.3, -1, -1] },
    ],
    "/scene1": [
      { text: "scene", position: [-leftEdge - 1.5, 0, -1] },
      { text: "1", position: [-leftEdge + 0.1, -1, -1] },
    ],
    "/scene2": [
      { text: "scene", position: [-leftEdge - 2.5, 1, -1] },
      { text: "2", position: [-leftEdge - 0.3, -1, -1] },
    ],
  };

  // デフォルト値を設定
  const texts = textMap[pathname] || [];

  return (
    <mesh>
      <Billboard>
        <ScrollControls pages={2} damping={0.15} enabled>
          <Scroll>
            {texts.map(({ text, position }, index) => (
              <Text
                key={index}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                position={position}
              >
                {text}
              </Text>
            ))}
          </Scroll>
        </ScrollControls>
      </Billboard>
    </mesh>
  );
};

export default Text2D;
