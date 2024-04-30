"use client";

import { useState } from "react";
import { useEditor } from "./editor/use-editor";

export function Highlight({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const { isLoading, html } = useEditor(code);
  return (
    <div className="relative p-4">
      {isLoading ? (
        <p className="font-mono tracking-wider text-black drop-shadow-[0_0_0.025rem_black] dark:text-white dark:drop-shadow-[0_0_0.1rem_white]">
          Loading...
        </p>
      ) : (
        <>
          <textarea
            id="input"
            name="input"
            className="absolute inset-0 size-full resize-none bg-transparent p-4 font-mono text-transparent caret-white selection:text-transparent dark:selection:bg-neutral-400/20"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key == "Tab") {
                e.preventDefault();
                var start = e.currentTarget.selectionStart;
                var end = e.currentTarget.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                e.currentTarget.value =
                  e.currentTarget.value.substring(0, start) +
                  "    " +
                  e.currentTarget.value.substring(end);

                // put caret at right position again
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
                  start + 4;
              }
            }}
          ></textarea>
          <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
    </div>
  );
}
