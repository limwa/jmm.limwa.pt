"use client";

import { useState } from "react";
import { useEditor } from "./editor/use-editor";

export function Highlight({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const { isLoading, html } = useEditor(code);

  return (
    <div className="relative w-max p-4 font-mono">
      {isLoading ? (
        <p className="tracking-wider text-black drop-shadow-[0_0_0.025rem_black] dark:text-white dark:drop-shadow-[0_0_0.1rem_white]">
          Loading...
        </p>
      ) : (
        <>
            <textarea
              id="input"
              name="input"
              className="absolute size-full outline-none resize-none bg-transparent overflow-visible text-transparent caret-white selection:text-transparent dark:selection:bg-neutral-400/20"
              value={code}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              data-enable-grammarly="false" 
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
            />
            <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
    </div>
  );
}
