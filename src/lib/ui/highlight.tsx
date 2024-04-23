"use client";

import { useEditor } from "./editor/use-editor";

export function Highlight({ initialCode }: { initialCode: string }) {
  const { isLoading, html } = useEditor(initialCode);

  return (
    <div className="overflow-scroll p-4">
      {isLoading ? (
        <p className="drop-shadow-[0_0_0.1rem_white] tracking-wider font-mono">
          Loading...
        </p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  );
}
