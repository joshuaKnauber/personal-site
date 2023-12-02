import { useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane003: THREE.Mesh;
  };
  materials: {};
};

export function Landscape(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/meshes/landscape.glb") as GLTFResult;
  const geometry = nodes.Plane003.geometry;

  const edges = new THREE.EdgesGeometry(geometry, 0);
  const mesh = new THREE.Mesh(geometry);
  const vertexPositions: [number, number, number][] = [];
  mesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const vertices = child.geometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        vertexPositions.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
      }
    }
  });
  console.log(vertexPositions);

  return (
    <group {...props} dispose={null} position={[1, -0.7, 4]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="black"
          metalness={1}
          roughness={0.5}
          transparent
          opacity={0.5}
          envMapIntensity={0.3}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineDashedMaterial color="white" transparent opacity={0.15} />
      </lineSegments>
      {/* {vertexPositions.map((position, i) => (
        <instancedMesh key={i} position={position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={"white"} />
        </instancedMesh>
      ))} */}
      {/* <points args={[geometry]}>
        <pointsMaterial
          size={0.1}
          color="gray"
          transparent
          opacity={0.1}
          sizeAttenuation={true}
        />
      </points> */}
    </group>
  );
}

useGLTF.preload("/landscape.glb");
