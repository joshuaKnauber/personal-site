import { useSpring } from "@react-spring/three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  Sphere,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import React from "react";
import * as THREE from "three";
import { Landscape } from "../meshes/Landscape";
import { Flag } from "../objects/Flag";

export function Scene() {
  const [target, setTarget] = useState([3, 0.77, -9]);
  const targetVector = new THREE.Vector3(...target);
  const animatedTarget = useSpring({ target, config: { duration: 300 } });

  const orbitRef = useRef<any>();
  const cameraRef = useRef<any>();

  useFrame(() => {
    if (orbitRef.current) {
      const newTarget = new THREE.Vector3(...animatedTarget.target.get());
      orbitRef.current.target = newTarget;
      cameraRef.current.lookAt(newTarget);
    }
  });

  return (
    <>
      <Environment preset="dawn" />
      {/* <Sparkles
        count={100}
        color={"orange"}
        position={targetVector}
        size={3}
        opacity={0.4}
        scale={30}
      /> */}
      <fog attach="fog" args={["#13060b", 6, 40]} />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={80}
        position={[6, 0, -4]}
      />
      <OrbitControls
        ref={orbitRef}
        makeDefault
        // maxDistance={7}
        target={targetVector}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.45}
      />
      <Flag
        position={[1.98, -0.11, -9.08]}
        onClick={() => setTarget([1.98, -0.11, -9.08])}
      />
      <Flag position={[10, 0.1, -7]} onClick={() => setTarget([10, 0.1, -7])} />
      <Landscape />
      {/* <Sphere args={[1, 64, 64]} position={targetVector}>
              <meshStandardMaterial
                color="lightgrey"
                envMapIntensity={0.06}
                metalness={1}
                roughness={0.5}
              />
            </Sphere> */}
    </>
  );
}
