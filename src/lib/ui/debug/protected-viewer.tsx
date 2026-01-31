"use client";

import { decrypt } from "@/lib/crypto/client";
import { useState } from "react";

export function ProtectedViewer({
  encryptedContent,
}: {
  encryptedContent: string;
}) {
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);

  return (
    <section className="p-4 border-t-2 border-neutral-500 bg-neutral-50 text-black dark:border-neutral-300 dark:bg-neutral-950 dark:text-white">
      {decryptedContent === null ? (
        <ViewerVerification encryptedContent={encryptedContent} setDecryptedContent={setDecryptedContent} />
      ) : (
        <ViewerContent content={decryptedContent} />
      )}
    </section>
  );
}

function ViewerVerification({
  encryptedContent,
  setDecryptedContent,
}: {
  encryptedContent: string;
  setDecryptedContent: (value: string | null) => void;
}) {
  const [decryptionFailed, setDecryptionFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get("password") as string;

    const decryptedContent = await decrypt(encryptedContent, password);
    if (decryptedContent === null) {
      setDecryptionFailed(true);
      return;
    }

    setDecryptedContent(decryptedContent);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center gap-2 p-8">
      <label htmlFor="password">
        Enter password to view content:
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="p-1 border-2 bg-white border-neutral-500 dark:bg-neutral-800 dark:border-neutral-300 focus:border-teal-400 focus:outline-none"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 border-2 bg-white border-neutral-500 dark:bg-neutral-800 dark:border-neutral-300 hover:opacity-95 transition-opacity focus:outline-none"
      >
        Unlock
      </button>
      {decryptionFailed && (
        <p className="mt-4 text-red-600">
          Unlock failed. Please check your password and try again.
        </p>
      )}
    </form>
  )
}

function ViewerContent({
  content,
}: {
  content: string;
}) {


  return (
    <pre className="selection:bg-neutral-400/30">
      {content}
    </pre>
  );
}
