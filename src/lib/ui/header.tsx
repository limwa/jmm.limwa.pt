import { cn } from "./utils/cn";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "bg-white px-4 py-2 text-black dark:bg-neutral-800 dark:text-white",
        className,
      )}
    >
      <div className="flex items-center justify-between selection:bg-neutral-400/30">
        <h1 className="font-mono text-lg tracking-wider">jmm compiler</h1>
        <a
          className="ml-auto rounded-full text-black outline-2 outline-offset-1 outline-teal-500 transition-colors hover:text-neutral-700 focus-visible:outline dark:text-white dark:outline-teal-300 dark:hover:text-neutral-300"
          href="https://github.com/limwa/jmm.limwa.pt"
        >
          <SiGithub size={20} title="Made with ❤️ by André Lima" />
        </a>
      </div>
    </header>
  );
}
