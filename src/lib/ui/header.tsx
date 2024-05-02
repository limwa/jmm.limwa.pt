import { cn } from "./utils/cn";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("bg-neutral-800 px-4 py-2 text-white", className)}>
      <div className="flex items-center justify-between selection:bg-neutral-400/30">
        <h1 className="font-mono text-lg tracking-wider">jmm compiler</h1>
        <a
          className="ml-auto rounded-full outline-offset-1 outline-2 outline-teal-300 transition-colors hover:text-neutral-300 focus-visible:outline"
          href="https://github.com/limwa/jmm.limwa.pt"
        >
          <SiGithub size={20} title="Made with ❤️ by André Lima" />
        </a>
      </div>
    </header>
  );
}
