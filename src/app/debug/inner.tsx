"use client";

import { ProtectedViewer } from "@/lib/ui/debug/protected-viewer";
import { Header } from "@/lib/ui/header";
import { TooltipProvider } from "@/lib/ui/tooltip";

export function Inner({
  receivedMessage,
  lastUpdated,
}: {
  receivedMessage: string | null;
  lastUpdated: Date | null;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <main className="grid h-dvh grid-rows-[auto_1fr]">
        <Header lastUpdated={lastUpdated} />
        <ProtectedViewer encryptedContent={receivedMessage ?? ""} />
      </main>
    </TooltipProvider>
  );
}
