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
    <>
      <div className="vignette"></div>
      <div className="overlay"></div>
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <div className="w-[100dvw] h-[100dvh] bg-[#13060b]">
          <Canvas shadows className={"cursor-grab"}>
            <Environment preset="dawn" />
            {/* <Sparkles
              count={100}
              position={target}
              size={2}
              opacity={0.5}
              scale={30}
            /> */}
            <fog attach="fog" args={["#13060b", 6, 40]} />
            <PerspectiveCamera makeDefault fov={80} position={[0, 0, 0]} />
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
            <Sphere args={[1, 64, 64]} position={target}>
              <meshStandardMaterial
                color="lightgrey"
                envMapIntensity={0.06}
                metalness={1}
                roughness={0.5}
              />
            </Sphere>
          </Canvas>
        </div>
      </div>
    </>
  );
}
