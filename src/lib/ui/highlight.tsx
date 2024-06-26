"use client";

import { useEditor } from "./editor/use-editor";
import { useCompilerContext } from "../hooks/compiler";

export function Highlight() {
  const { code, setCode } = useCompilerContext();
  const { isLoading, html } = useEditor(code);

  return (
    <div className="relative min-h-full w-max min-w-full p-4 font-mono selection:bg-neutral-400/30">
      {isLoading ? (
        <p className="tracking-wider text-black drop-shadow-[0_0_0.025rem_black] dark:text-white dark:drop-shadow-[0_0_0.1rem_white]">
          Loading...
        </p>
      ) : (
        <>
          <textarea
            id="input"
            name="input"
            className="absolute inset-0 size-full resize-none bg-transparent p-4 pl-[4rem] text-transparent caret-black outline-none selection:text-transparent dark:caret-white"
            value={code}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            data-enable-grammarly="false"
            onChange={(e) => {
              const newCode = e.currentTarget.value.replaceAll("\t", "    ");
              setCode(newCode);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                var start = e.currentTarget.selectionStart;
                var end = e.currentTarget.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                const newCode =
                  e.currentTarget.value.substring(0, start) +
                  "    " +
                  e.currentTarget.value.substring(end);
                e.currentTarget.value = newCode;

                // put caret at right position again
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
                  start + 4;

                setCode(newCode);
              }
            }}
          />
          <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
    </div>
  );
}
