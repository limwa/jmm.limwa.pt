"use client";

import { Header } from "@/lib/ui/header";
import { TabSelector } from "@/lib/ui/tabs/selector";
import { TabController } from "@/lib/ui/tabs/controller";
import { useBreakpoint } from "@/lib/ui/tailwindcss/client/hooks/breakpoint";
import { cn } from "@/lib/ui/utils/cn";
import { OutputTabContents } from "@/lib/ui/protocol/OutputTabContents";
import { OutputTabSelectors } from "@/lib/ui/protocol/OutputTabSelectors";
import { OutputTabController } from "@/lib/ui/protocol/OutputTabController";
import { CompilerProvider } from "@/lib/hooks/compiler";
import CodeEditor from "@/lib/ui/editor/codeEditor";

const defaultCode = `// Insert your code here

// After 3s, it will automatically be compiled and the result
// will be shown on the other tabs.
//
// A green circle indicates that the step was performed
// successfuly, while a red circle indicates that there were errors.

class HelloWorld {

}
`;

export function Inner({ initialCode }: { initialCode: string | null }) {
  const lg = useBreakpoint("lg");

  return (
    <CompilerProvider initialCode={initialCode ?? defaultCode}>
      <main
        className={cn(
          "grid h-dvh grid-cols-2 grid-rows-[max-content,1fr] gap-x-[0.15rem] bg-neutral-500 dark:bg-neutral-300",
        )}
      >
        <Header className="col-span-2 col-start-1" />
        <TabController
          initialTab="input"
          key={
            lg.loading || lg.active
              ? "tab-controller-input"
              : "tab-controller-all"
          }
        >
          <section
            className={
              "col-span-2 grid grid-cols-1 grid-rows-[max-content,1fr] overflow-y-auto lg:col-span-1"
            }
          >
            {" "}
            {/* col-span-2 lg:col-span-1 */}
            <div className="overflow-x-auto">
              <nav className="flex w-full lg:flex-wrap">
                <TabSelector
                  name="input"
                  readOnly={lg.loading || lg.active}
                  className="data-[selected]:bg-neutral-100 dark:data-[selected]:bg-neutral-900"
                >
                  <h2>Input</h2>
                </TabSelector>
                {!lg.loading && !lg.active && <OutputTabSelectors />}
              </nav>
            </div>
            <CodeEditor initialCode={initialCode ?? defaultCode}/>
            {!lg.loading && !lg.active && <OutputTabContents />}
          </section>
        </TabController>
        {lg.loading && (
          <TabController initialTab="loading">
            <section className="hidden grid-cols-1 grid-rows-[max-content,1fr] overflow-y-auto lg:grid">
              <div className="overflow-x-auto">
                <nav className="flex w-full lg:flex-wrap">
                  <TabSelector
                    name="loading"
                    readOnly
                    className="border-t-neutral-400 bg-neutral-50 dark:bg-neutral-950"
                  >
                    <h2>Loading...</h2>
                  </TabSelector>
                </nav>
              </div>
              <div className="overflow-x-auto bg-neutral-50 text-black outline-2 -outline-offset-2 outline-teal-500 focus-visible:outline dark:bg-neutral-950 dark:text-white dark:outline-teal-300" />
            </section>
          </TabController>
        )}
        {!lg.loading && lg.active && (
          <OutputTabController>
            <section className="grid grid-cols-1 grid-rows-[max-content,1fr] overflow-y-auto">
              <div className="overflow-x-auto">
                <nav className="flex w-full lg:flex-wrap">
                  <OutputTabSelectors />
                </nav>
              </div>
              <OutputTabContents />
            </section>
          </OutputTabController>
        )}
      </main>
    </CompilerProvider>
  );
}
