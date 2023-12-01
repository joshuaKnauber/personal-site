"use client";

import { useSpring, animated } from "@react-spring/three";
import {
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Sparkles,
  Sphere,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import { Landscape } from "./meshes/Landscape";
import { Flag } from "./objects/Flag";

export function Scene() {
  const target = new THREE.Vector3(3, 0.77, -9);

  return (
    <Canvas shadows className={"cursor-grab"}>
      <Environment preset="dawn" />
      {/* <Sparkles
        count={100}
        position={target}
        size={2}
        opacity={0.5}
        scale={30}
      /> */}
      <fog attach="fog" args={["black", 6, 40]} />
      <PerspectiveCamera makeDefault fov={100} position={[0, 0, 0]} />
      <OrbitControls
        makeDefault
        maxDistance={7}
        target={target}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.45}
      />
      <Flag position={[1.98, -0.11, -9.08]} />
      <Flag position={[10, 0.1, -7]} />
      <Landscape />
      {/* <Sphere args={[1, 32, 32]} position={target}>
        <meshStandardMaterial
          color="lightgrey"
          envMapIntensity={0.08}
          metalness={1}
          roughness={0.4}
        />
      </Sphere> */}
    </Canvas>
  );
}
