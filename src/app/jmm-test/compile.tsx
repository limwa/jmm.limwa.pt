"use client";

import { useFormState } from "react-dom";
import { compileJmm } from "../actions";
import { useMemo, useState } from "react";
import type { ProtocolSection } from "../actions";

export function Compile() {
  const [[stdout, ...sections], dispatch, isPending] = useFormState(compileJmm, [{
    name: "Waiting for input...",
    uuid: "waiting-for-input",
    status: "good",
    content: "",
  }])

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
        {false ? (
            <>
        <p className="text-lg font-light">Your code has errors...</p>
        <textarea
            readOnly
            className="mt-2 text-black font-mono p-4 grow rounded"
            // value={stderr}
          ></textarea>
            </>
          
        ) : (
            <>
            <p className="text-lg font-light">Your code compiles properly...</p>
            <CompileOutput stdout={JSON.stringify(stdout)} />
            </>
        )}
      </div>
    </div>
  );
}

function slices(content: string, markers: string[]) {
    const slices = [] as string[];

    let start = content.indexOf(markers[0]);
    if (start === -1) return null;

    start += markers[0].length;

    for (let i = 1; i < markers.length; i++) {
        const end = content.indexOf(markers[i]);
        if (end === -1) return null;

        const slice = content.slice(start, end).trim();
        slices.push(slice);
        start = end + markers[i].length;
    }

    const lastSlice = content.slice(start).trim();
    slices.push(lastSlice);

    return slices;
}

export function CompileOutput({ stdout }: { stdout: string }) {
  const obj = useMemo(() => {
    // const results = slices(stdout, [
    //     "Symbol Table:",
    //     "AST:",
    //     "OPTIMIZED AST:",
    //     "OLLIR RESULT:",
    //     "OPTIMIZED OLLIR RESULT:",
    //     "JASMIN CODE:",
    //     ]);

      const results = [stdout, "", "", "", "", ""]

    if (results === null) {
        return {
            "Symbol Table": "",
            AST: "",
            "Optimized AST": "",
            OLLIR: "",
            "Optimized OLLIR": "",
            Jasmin: "",
        };
    }

    const [symbolTable, ast, optimizedAst, ollir, optimizedOllir, jasmin] = results;

    return {
      "Symbol Table": symbolTable,
      AST: ast,
      "Optimized AST": optimizedAst,
      OLLIR: ollir,
      "Optimized OLLIR": optimizedOllir,
      Jasmin: jasmin,
    };
  }, [stdout]);

  const [selectedTab, setSelectedTab] = useState<keyof typeof obj>("Symbol Table");

  return (
    <div className="size-full flex flex-col">
      <div className="flex gap-1">
        {Object.keys(obj).map((key) => (
          <button key={key} className="px-4 py-2 bg-slate-500 rounded hover:bg-slate-600 transition-colors disabled:bg-purple-700" disabled={selectedTab === key} onClick={() => setSelectedTab(key as keyof typeof obj)}>
            {key}
          </button>
        ))}
      </div>
      <textarea value={obj[selectedTab]} readOnly 
            className="mt-2 text-black font-mono p-4 grow rounded"></textarea>
    </div>
  );
}
