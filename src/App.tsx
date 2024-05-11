import { CodeLogo } from "./logos/code";
import { TeslaLogo } from "./logos/tesla";
import { TwitterIcon, Linkedin, GithubIcon, Mail } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [copied, setCopied] = useState(false);
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto flex h-fit w-full max-w-2xl flex-col items-start gap-20 px-4 pb-32 pt-32">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-semibold">Joshua Knauber</h1>
        <p className="text-white/75">
          Hello there, I'm Josh. I'm a Software Engineer and UX Designer and I
          currently live in Berlin.
          <br />I did my bachelors in Interaction Design at CODE University in
          Berlin and am currently working at Tesla.
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
        <h2 className="mb-2 text-2xl font-semibold">Timeline</h2>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="flex size-6 items-center justify-center">
              <TeslaLogo className="size-5" />
            </div>
            <span className="font-medium">Tesla</span>
          </div>
          <span className="opacity-50">
            Software Engineer & UX&nbsp;&nbsp;&nbsp;&nbsp;2022-Present
          </span>
        </div>
        <div className="flex w-6 flex-row items-center gap-1.5 opacity-50">
          <div className="h-0.5 w-2.5 shrink-0 rounded-full bg-white"></div>
          <div className="h-0.5 w-2 shrink-0 rounded-full bg-white"></div>
          <div className="h-0.5 w-1.5 shrink-0 rounded-full bg-white"></div>
          <div className="h-0.5 w-1 shrink-0 rounded-full bg-white"></div>
          <div className="h-0.5 w-0.5 shrink-0 rounded-full bg-white"></div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="flex size-6 items-center justify-center">
              <CodeLogo className="size-6" />
            </div>
            <span className="font-medium">CODE University</span>
          </div>
          <span className="opacity-50">
            Interaction Design, Bachelor&nbsp;&nbsp;&nbsp;&nbsp;2020-2024
          </span>
        </div>
      </div>
      {/* <div className="mb-2 flex w-full flex-col gap-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="columns-2 gap-6 [&>div]:mb-6">
          <ProjectCard
            title="Serpens"
            icons={
              <>
                <span className="opacity-50">icon</span>
                <span className="opacity-50">icon</span>
                <span className="opacity-50">icon</span>
              </>
            }
            description="esfpekpfspefp fkeopskf pokespokf poeskpfk peskf"
          />
          <ProjectCard
            title="blend.stream"
            icons={
              <>
                <span className="opacity-50">icon</span>
                <span className="opacity-50">icon</span>
                <span className="opacity-50">icon</span>
              </>
            }
            description="esfpekpfspefp"
          />
        </div>
      </div> */}
      <div className="mb-2 flex w-full flex-col gap-6">
        <h2 className="text-2xl font-semibold">Socials</h2>
        <div className="flex flex-col gap-5">
          <a
            className="group flex w-fit cursor-pointer flex-row items-center gap-3 opacity-75 hover:opacity-100"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/joshuaKnauber/"
          >
            <GithubIcon className="size-6 transition-all group-hover:rotate-[20deg]" />
            <span className="font-mono">joshuaKnauber</span>
          </a>
          <a
            className="group flex w-fit cursor-pointer flex-row items-center gap-3 opacity-75 hover:opacity-100"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/joshuaknauber"
          >
            <TwitterIcon className="size-6 transition-all group-hover:rotate-[20deg]" />
            <span className="font-mono">@joshuaknauber</span>
          </a>
          <a
            className="group flex w-fit cursor-pointer flex-row items-center gap-3 opacity-75 hover:opacity-100"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/joshua-knauber-410b31221/"
          >
            <Linkedin className="size-6 transition-all group-hover:rotate-[20deg]" />
            <span className="font-mono">Joshua Knauber</span>
          </a>
          <button
            onClick={() => onCopy("joshua.knauber@gmail.com")}
            className="group flex w-fit cursor-pointer flex-row items-center gap-3 text-white/75 hover:text-white"
          >
            <Mail className="size-6 transition-all group-hover:rotate-[20deg]" />
            <span className="font-mono">joshua.knauber@gmail.com</span>
            <span
              className={`rounded-md bg-white/10 px-2 py-0.5 font-mono text-sm text-white transition-all ${copied ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              Copied
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
