"use client";

import { Canvas } from "@/components/canvas/Canvas";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./cube.module.css";

type Props = {
  side: number;
};

// SCENE -> Overview of everything?
// CV -> Normal cv list
// CONTACT -> socials etc

export function Cube({ side }: Props) {
  const actualSide = side % 6;

  const containerRef = useRef<HTMLDivElement>(null);
  const [maxSize, setMaxSize] = useState<number>(500);

  const rotations = [
    { x: 0, y: 0, z: 0 }, // front
    { x: 0, y: -180, z: 0 }, // back
    { x: -90, y: -180, z: 0 }, // top
    { x: -90, y: -180, z: 180 }, // bottom
    { x: -90, y: -180, z: 270 }, // right
    { x: -90, y: -180, z: 90 }, // left
  ];
  const transform = `rotateX(${rotations[actualSide].x}deg) rotateY(${rotations[actualSide].y}deg) rotateZ(${rotations[actualSide].z}deg)`;

  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      setMaxSize(
        Math.min.apply(null, [
          containerRef.current.clientWidth,
          containerRef.current.clientHeight,
          500,
        ]),
      );
    };

    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} w-full h-full flex justify-center items-center`}
    >
      <div
        className={`${styles.cubeWrapper} w-full h-full aspect-square relative`}
        style={{ maxWidth: maxSize, maxHeight: maxSize }}
      >
        <div
          className={`${
            styles.cube
          } w-full relative h-full transition-transform duration-500 ${
            actualSide === 0 ? "" : "delay-500"
          }`}
          style={{
            transform: transform,
          }}
        >
          <div
            // Front
            className="relative"
            style={{ transform: `rotateY(0deg) translateZ(${maxSize / 2}px)` }}
          >
            <div
              className={`${styles.screen} ${
                actualSide === 0 ? `${styles.full} delay-500` : ""
              } transition-all duration-200 md:p-8 p-6 relative w-full h-full bg-black`}
            >
              <Canvas />
            </div>
          </div>
          <div
            // Back
            style={{
              transform: `rotateY(180deg) translateZ(${maxSize / 2}px)`,
            }}
          >
            <span>CV</span>
          </div>
          <div
            // Left
            style={{
              transform: `rotateY(-90deg) translateZ(${
                maxSize / 2
              }px) rotateZ(90deg)`,
            }}
          >
            <span>Left</span>
          </div>
          <div
            // Right
            style={{
              transform: `rotateY(90deg) translateZ(${
                maxSize / 2
              }px) rotateZ(-90deg)`,
            }}
          >
            <span>Right</span>
          </div>
          <div
            // Top
            style={{
              transform: `rotateX(90deg) translateZ(${
                maxSize / 2
              }px) rotateZ(180deg)`,
            }}
          >
            <span>Contact</span>
          </div>
          <div
            // Bottom
            style={{
              transform: `rotateX(-90deg) translateZ(${maxSize / 2}px)`,
            }}
          >
            <span>Bottom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
