"use client";

import { decrypt } from "@/lib/crypto/client";
import { Header } from "@/lib/ui/header";
import { TooltipProvider } from "@/lib/ui/tooltip";
import { decode } from "@/lib/utils/base64";
import { useEffect, useState } from "react";

async function extractErrorMessage(
  receivedMessage: string | null,
  password: string,
): Promise<string | null> {
  if (receivedMessage === null) {
    return null;
  }

  const decryptedMessage = await decrypt(receivedMessage, password);
  return decryptedMessage;
}

export function Inner({
  receivedMessage,
  lastUpdated,
}: {
  receivedMessage: string | null;
  lastUpdated: Date | null;
}) {
  const [displayedError, setDisplayedError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const message = await extractErrorMessage(receivedMessage, "password");

      if (message === null) {
        setDisplayedError(
          "Could not decrypt error message. Make sure the URL is correct.",
        );
        return;
      }

      setDisplayedError(message);
    })();
  }, [receivedMessage]);

  return (
    <TooltipProvider delayDuration={100}>
      <main className="grid h-dvh grid-rows-[auto_1fr]">
        <Header lastUpdated={lastUpdated} />
        <section className="border-t-2 border-t-neutral-500 bg-neutral-50 text-black dark:border-t-neutral-300 dark:bg-neutral-950 dark:text-white">
          <pre className="p-4 selection:bg-neutral-400/30">
            {displayedError ?? "Loading error message..."}
          </pre>
        </section>
      </main>
    </TooltipProvider>
  );
}
