"use client";

import { Header } from "@/lib/ui/header";
import { TabSelector } from "@/lib/ui/tabs/selector";
import { TabController } from "@/lib/ui/tabs/controller";
import { useBreakpoint } from "@/lib/ui/tailwindcss/client/hooks/breakpoint";
import { Highlight } from "@/lib/ui/highlight";
import { useFormState } from "react-dom";
import { compileJmm, type ProtocolSection } from "./actions";

// export const metadata: Metadata = {
//   title: "COMP2023",
//   description: "An application to compile Java-- code",
// };

export default function Home() {
  const lg = useBreakpoint("lg");

  const [sections, dispatch, isPending] = useFormState(compileJmm, [{
    name: "Waiting for input...",
    uuid: "waiting-for-input",
    status: "good",
    content: "",
  }] as ProtocolSection[]);
  
  console.log({sections});

  return (
    <main className="grid h-dvh grid-rows-[max-content,1fr] gap-x-[0.1rem] grid-cols-2">
      <Header className="col-start-1 col-span-2" />
      <TabController initialTab="input">
        <section className="grid grid-cols-1 grid-rows-[max-content,1fr] overflow-y-auto col-span-2 lg:col-span-1"> {/* col-span-2 lg:col-span-1 */}
          <div className="overflow-x-auto">
            <nav className="flex w-full lg:flex-wrap">
              <TabSelector name="input" readOnly>
                <h2>Input</h2>
              </TabSelector>
              <TabSelector name="symbol-table">
                  <h2>Symbol Table</h2>
                </TabSelector>
                <TabSelector name="ast">
                  <h2>AST</h2>
                </TabSelector>
                <TabSelector name="optimized-ast">
                  <h2>Optimized AST</h2>
                </TabSelector>
                <TabSelector name="ollir">
                  <h2>OLLIR</h2>
                </TabSelector>
                <TabSelector name="optimized-ollir">
                  <h2>Optimized OLLIR</h2>
                </TabSelector>
                <TabSelector name="jasmin">
                  <h2>Jasmin</h2>
                </TabSelector>
            </nav>
          </div>
          <div className="dark:bg-neutral-900 overflow-x-auto outline-2 -outline-offset-2 outline-teal-300 focus-visible:outline">
            <Highlight initialCode={`
import io;

class Main {

    public static void main(String[] args) {
        
        // Initialize status
        int status;
        status = 0;
        
        printArray(args);
    }
    
    public static void printArray(String[] args) {
        int i;

        i = 0;
        while (i < args.length) {
            printString(args[i]);
        }
    }

    public static void printString(String arg) {
        io.println(arg);
    }

    public static void printLineNumber(int i) {
        io.print(i);
    }

    public static void printLine(String arg, int lineNum) {
        printLineNumber(lineNum);
        printString(arg);
    }

    public static void printLines(String[] args) {
        int i;

        i = 0;
        while (i < args.length) {
            printLine(args[i], i);
        }
    }
}
      
`.trim()} />
          </div>
        </section>
      </TabController>
      {lg && (
        <TabController initialTab="input">
          <section className="grid grid-cols-1 grid-rows-[max-content,1fr] overflow-y-auto">
            <div className="overflow-x-auto">
              <nav className="flex w-full lg:flex-wrap">
                <TabSelector name="input" readOnly>
                  <h2>Input</h2>
                </TabSelector>
              </nav>
            </div>
            <div className="overflow-x-auto outline-2 -outline-offset-2 outline-teal-300 focus-visible:outline">
              <pre className="block w-max p-4">
                {
                  "a\nb\nc\n\n\n\n\nn---------------------------------------------------------------------------------------------------------\n\n\n\n\n\n\n\nn\n\nn\n\n\n\nn\n\n\n\n\n\n\n\nn\n\n\n\n\n\n\nn\n\n\n\n\n\n\n\n\n\n\n\n\n\nn\n\n\n\n\nn\n\n\nn\n\n\n\n\n\nf"
                }
              </pre>
            </div>
          </section>
        </TabController>
      )}
    </main>
  );
}
