"use client";

import { useFormState } from "react-dom";
import { compileJmm } from "./actions";

export function Compile() {
  const [[stdout, stderr], dispatch, isPending] = useFormState(compileJmm, [
    "--stdout--",
    "--stderr--",
  ]);

  return (
    <div className="mt-8 grow flex justify-between gap-4">
      <form className="size-full flex flex-col" action={dispatch}>
        <h2 className="text-lg font-light">Your code goes here</h2>
        <textarea
          className="text-black font-mono p-4 grow mt-2 rounded"
          name="code"
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
        <button
          className="w-max px-4 py-2 hover:bg-gray-200 transition-colors mt-2 bg-white text-black rounded"
          disabled={isPending}
        >
          Compile
        </button>
      </form>
      <div className="size-full flex flex-col">
        <h2 className="text-lg font-light">The output and error goes here</h2>
        <textarea
          readOnly
          className="mt-2 text-black font-mono p-4 grow rounded"
          value={stdout}
        ></textarea>
        <textarea
          readOnly
          className="mt-2 text-black font-mono p-4 grow rounded"
          value={stderr}
        ></textarea>
      </div>
    </div>
  );
}
