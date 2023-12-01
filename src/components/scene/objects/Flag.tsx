import { animated, useSpring } from "@react-spring/three";
import { Billboard, Line, Text } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
};

export function Flag({ position }: Props) {
  const [hover, setHover] = useState(false);

  const { scale } = useSpring({ scale: hover ? 1.5 : 1 });
  const { opacity } = useSpring({ opacity: hover ? 1 : 0.75 });
  const { points } = useSpring({
    points: hover
      ? [
          [position[0], position[1] + 0.3, position[2]],
          [position[0], position[1] + 1, position[2]],
        ]
      : [
          [position[0], position[1] + 0.3, position[2]],
          [position[0], position[1] + 0.3, position[2]],
        ],
  });
  return (
    <group>
      <mesh
        position={position}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial
          emissive={"white"}
          opacity={0}
          transparent
          depthWrite={false}
        />
      </mesh>
      <animated.mesh scale={scale} position={position}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <animated.meshStandardMaterial
          emissive={"white"}
          opacity={opacity}
          transparent
        />
      </animated.mesh>
      <Line
        points={[
          [position[0], position[1] + 0.3, position[2]],
          [position[0], position[1] + 1, position[2]],
        ]}
        color={"white"}
        lineWidth={1}
      ></Line>
    </group>
  );
}
