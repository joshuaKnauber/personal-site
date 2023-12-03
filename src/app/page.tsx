"use client";

import { Canvas } from "@/components/canvas/Canvas";
import { Cube } from "@/components/canvas/cube/Cube";
import { useState } from "react";

export default function Home() {
  const [side, setSide] = useState<number>(0);

  return (
    <main className="h-[100dvh]">
      <div className="md:p-20 overflow-hidden p-12 w-full h-full">
        <Cube side={side} />
      </div>
      <div className="flex flex-row items-center gap-4 z-20 fixed top-4 right-4">
        <button onClick={() => setSide(0)} className="">
          home
        </button>
        <button onClick={() => setSide(1)} className="">
          cv
        </button>
        <button onClick={() => setSide(2)} className="">
          contact
        </button>
      </div>
      {/* <div
        className={`transition-all relative overflow-hidden ${
          hover ? "w-1/2 h-full max-w-full" : "w-full h-full"
        }`}
      >
        <Canvas />
      </div> */}
    </main>
  );
}
