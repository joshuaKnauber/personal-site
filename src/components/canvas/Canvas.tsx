"use client";

import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";

export function Canvas() {
  return (
    <>
      {/* <div className="vignette"></div>
      <div className="overlay"></div> */}
      <div className="w-full h-full grid justify-center content-center">
        <div className="w-[100dvw] h-[100dvh] bg-[#13060b]">
          <ThreeCanvas shadows className={"cursor-grab"}>
            <Scene />
          </ThreeCanvas>
        </div>
      </div>
    </>
  );
}
