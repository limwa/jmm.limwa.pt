import { cn } from "../utils/cn";

export function Header({ className }: { className?: string }) {
	return (
		<header className={cn("text-white bg-neutral-800 px-4 py-2", className)}>
			<h1 className="font-mono text-lg tracking-wider">
				jmm compiler by <a href="https://github.com/limwa" className="hover:drop-shadow-[0_0_0.1rem_currentColor] transition-all">limwa</a>
			</h1>
		</header>
	);
}
