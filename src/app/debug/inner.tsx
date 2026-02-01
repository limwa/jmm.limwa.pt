"use client";

import { ProtectedViewer } from "@/lib/ui/debug/protected-viewer";
import { Header } from "@/lib/ui/header";
import { TooltipProvider } from "@/lib/ui/tooltip";

export function Inner({
  encryptedError: encryptedError,
  lastUpdated,
}: {
  encryptedError: string | null;
  lastUpdated: Date | null;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <main className="grid h-dvh grid-rows-[auto_1fr]">
        <Header lastUpdated={lastUpdated} />
        {encryptedError !== null && encryptedError !== ""
          ? <ProtectedViewer encryptedContent={encryptedError} />
          : <div className="flex items-center justify-center p-4 border-t-2 border-neutral-500 bg-neutral-50 text-black dark:border-neutral-300 dark:bg-neutral-950 dark:text-white">
              No debug payload provided.
            </div>}
      </main>
    </TooltipProvider>
  );
}
