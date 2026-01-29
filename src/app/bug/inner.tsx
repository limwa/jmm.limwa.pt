'use client';

import { Header } from "@/lib/ui/header";
import { TooltipProvider } from "@/lib/ui/tooltip";
import { decode } from "@/lib/utils/base64";

export function Inner({
  errorMessage,
  lastUpdated,
}: {
  errorMessage: string;
  lastUpdated: Date | null;
}) {
  return <TooltipProvider delayDuration={100}>
    <main className="grid grid-rows-[auto_1fr] h-dvh">
      <Header lastUpdated={lastUpdated}/>
      <section className="bg-neutral-50 text-black border-t-2 border-t-neutral-500 dark:bg-neutral-950 dark:text-white dark:border-t-neutral-300">
        <pre className="p-4 selection:bg-neutral-400/30">
          {decode(errorMessage)}
        </pre>
      </section>
    </main>
  </TooltipProvider>;
}