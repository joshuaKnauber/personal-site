import { animated, useSpring } from "@react-spring/three";
import { animated as animatedHtml } from "@react-spring/web";
import { Billboard, Html, Line, Text } from "@react-three/drei";
import { useState } from "react";

type Props = {
  position: [number, number, number];
};

export function Flag({ position }: Props) {
  const [hover, setHover] = useState(false);

  const { scaleDot } = useSpring({ scaleDot: hover ? 1.5 : 1 });
  const { opacityDot } = useSpring({ opacityDot: hover ? 1 : 0.75 });

  const bannerRiseDuration = 250;
  const riseOffsetDuration = 200;

  const { scaleLine } = useSpring({
    scaleLine: hover ? 1 : 0,
    delay: hover ? 0 : riseOffsetDuration,
    config: {
      duration: bannerRiseDuration,
    },
  });

  const bannerWidth = useSpring({
    width: hover ? "100%" : "0%",
    opacity: hover ? 1 : 0,
    from: { width: "0%", opacity: 0 },
    delay: hover ? riseOffsetDuration : 0,
    config: {
      duration: bannerRiseDuration,
    },
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
      <animated.mesh scale={scaleDot} position={position}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <animated.meshStandardMaterial
          emissive={"white"}
          opacity={opacityDot}
          transparent
        />
      </animated.mesh>
      <Billboard position={position}>
        {/* <Line
          points={[
            [position[0], position[1] + 0.3, position[2]],
            [position[0], position[1] + 1, position[2]],
          ]}
          color={"white"}
          lineWidth={1}
        ></Line> */}
        <animated.group scale={scaleLine} position={[0, 0.2, 0]}>
          <Line
            points={[
              [0, 0, 0],
              [0, 1, 0],
            ]}
            color={"white"}
            lineWidth={1}
          ></Line>
        </animated.group>
        <Html position={[0, 1.2, 0]} distanceFactor={10}>
          <animatedHtml.div className={"overflow-hidden"} style={bannerWidth}>
            <div className="ring-inset ring-1 ring-white px-4 py-2 ml-2">
              <span className="font-light">testing</span>
            </div>
          </animatedHtml.div>
        </Html>
      </Billboard>
    </group>
  );
}
