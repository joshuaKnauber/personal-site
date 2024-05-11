import { useState } from "react";
import styles from "./projectCard.module.css";

type ProjectCardProps = {
  title: string;
  icons: React.ReactNode;
  description: string;
};

export function ProjectCard({ title, icons, description }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((c) => !c)}
      className={`${styles.container} ${open ? styles.open : ""} relative flex h-40 cursor-pointer flex-row`}
    >
      <div className="z-10 shrink-0 flex-grow rounded-t-md border border-r-0 border-white/25 bg-bg">
        <div className="">
          <span className="text-lg font-medium">{title}</span>
        </div>
      </div>
      <div className="z-10 flex shrink-0 flex-grow flex-row items-center gap-2 rounded-b-md border border-l-0 border-dashed border-white/25 bg-bg">
        <div className="flex flex-row items-center gap-2 px-8">{icons}</div>
      </div>
      <div className="absolute bottom-0 left-0 h-20 w-full rounded-b-md bg-black">
        <span className="leading-tight text-white/75">{description}</span>
      </div>
    </div>
  );
}
