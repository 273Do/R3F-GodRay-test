import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  GodRays,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

export const Effects = () => {
  const [lightMesh, setLightMesh] =
    useState<
      React.MutableRefObject<
        THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
      >
    >();

  const { scene } = useThree();
  console.log("scene", scene);

  useEffect(() => {
    if (scene.userData.refs && scene.userData.refs.lightMesh) {
      const lightMeshRef = scene.userData.refs.lightMesh;
      setLightMesh(lightMeshRef);
    }
  }, [scene.userData.refs]);

  return (
    <EffectComposer>
      {/* <Bloom
        luminanceThreshold={4}
        luminanceSmoothing={0.9}
        height={300}
        opacity={1}
        intensity={0.2}
      /> */}

      <>
        {lightMesh && (
          <GodRays
            sun={lightMesh.current!}
            blendFunction={BlendFunction.SCREEN}
            samples={100}
            density={0.96}
            decay={0.98}
            weight={0.3}
            exposure={1}
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
        )}
      </>
      <Noise opacity={0.25} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};
