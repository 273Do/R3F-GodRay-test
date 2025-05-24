import { Html } from "@react-three/drei";
import React from "react";

const HTMLContents = () => {
  return (
    // <Billboard>
    <Html position={[0, 0, -15]} transform>
      <div>
        <p style={{ fontSize: "2.8em", background: "transparent" }}>test</p>
      </div>
    </Html>
    // </Billboard>
  );
};

export default HTMLContents;
