"use client";

import { Scene } from "@/components/scene/Scene";
import { useState } from "react";

export default function Home() {
  const [hover, setHover] = useState(false);

  return (
    <main className="h-[100dvh]">
      <button
        onClick={() => setHover((c) => !c)}
        className="fixed z-20 top-4 right-4"
      >
        test
      </button>
      <div
        className={`transition-all relative overflow-hidden ${
          hover ? "w-[500px] h-[500px] max-w-full" : "w-full h-full"
        }`}
      >
        <Scene />
      </div>
    </main>
  );
}
