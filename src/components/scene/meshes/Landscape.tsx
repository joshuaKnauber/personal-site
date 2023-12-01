import { PointMaterial, useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { Geometry } from "three/examples/jsm/deprecated/Geometry.js";

type GLTFResult = GLTF & {
  nodes: {
    Plane003: THREE.Mesh;
  };
  materials: {};
};

export function Landscape(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/meshes/landscape.glb") as GLTFResult;
  const geometry = nodes.Plane003.geometry;

  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <group {...props} dispose={null} position={[1, -0.7, 4]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="black"
          metalness={1}
          roughness={0.5}
          transparent
          opacity={0.5}
          //   opacity={1}
          envMapIntensity={0.3}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineDashedMaterial color="white" transparent opacity={0.1} />
      </lineSegments>
      <points args={[geometry]}>
        <pointsMaterial
          size={0.05}
          color="gray"
          transparent
          opacity={0.1}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}

useGLTF.preload("/landscape.glb");
