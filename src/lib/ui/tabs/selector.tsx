"use client";

import { cn } from "@/lib/utils/cn";
import { useTabSelector } from "./hooks/selector";

export function TabSelector({ name, readOnly, children }: { name: string, readOnly?: boolean, children?: React.ReactNode }) {
  const { selected, select } = useTabSelector(name);
  
  return (
    <button
      type="button"
      disabled={readOnly || selected}
      onClick={() => select()}
      className={cn(
        "grow border-t-2 border-t-transparent bg-neutral-700 px-4 py-2 text-center text-neutral-200 tracking-wide enabled:hover:bg-neutral-600 transition-colors",
        selected && "border-t-teal-300 bg-neutral-800",
      )}
    >
      {children}
    </button>
  );
}
