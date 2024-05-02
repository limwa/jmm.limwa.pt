"use client";

import { cn } from "@/lib/ui/utils/cn";
import { useTabSelector } from "./hooks/selector";

export function TabSelector({ name, readOnly, className, children }: { name: string, className?: string, readOnly?: boolean, children?: React.ReactNode }) {
  const { selected, select } = useTabSelector(name);
  
  return (
    <button
      type="button"
      disabled={readOnly || selected}
      onClick={() => select()}
      data-selected={selected || undefined}
      className={cn(
        "focus-visible:outline outline-teal-500 dark:outline-teal-300 outline-2 -outline-offset-2 grow border-t-2 border-t-transparent bg-neutral-300 dark:bg-neutral-700 px-4 py-2 text-center text-neutral-800 dark:text-neutral-200 tracking-wide enabled:hover:bg-neutral-200 dark:enabled:hover:bg-neutral-800 enabled:hover:border-t-neutral-400 transition-colors",
        selected && "border-t-neutral-500 dark:border-t-neutral-300",
        className
      )}
    >
      {children}
    </button>
  );
}
