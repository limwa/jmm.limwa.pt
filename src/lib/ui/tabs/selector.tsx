"use client";

import { cn } from "@/lib/ui/utils/cn";
import { useTabSelector } from "./hooks/selector";

export function TabSelector({
  name,
  readOnly,
  className,
  children,
}: {
  name: string;
  className?: string;
  readOnly?: boolean;
  children?: React.ReactNode;
}) {
  const { selected, select } = useTabSelector(name);

  return (
    <button
      type="button"
      disabled={readOnly || selected}
      onClick={() => select()}
      data-selected={selected || undefined}
      className={cn(
        "grow border-t-2 border-t-transparent bg-neutral-300 px-4 py-2 text-center tracking-wide text-neutral-800 outline-2 -outline-offset-2 outline-teal-500 transition-colors focus-visible:outline enabled:hover:border-t-neutral-400 enabled:hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 dark:outline-teal-300 dark:enabled:hover:bg-neutral-800",
        selected && "border-t-neutral-500 dark:border-t-neutral-300",
        className,
      )}
    >
      {children}
    </button>
  );
}
