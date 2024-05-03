import { useCompilerContext } from "@/lib/hooks/compiler"
import { TabSelector } from "../tabs/selector";
import { cn } from "../utils/cn";

export function OutputTabSelectors() {
    const { outputSections } = useCompilerContext();

    return outputSections.map(section => (
        <TabSelector key={section.uuid} name={section.name} className="data-[selected]:bg-neutral-50 dark:data-[selected]:bg-neutral-950">
          <div className="flex gap-4 items-center w-max mx-auto">
            <h2>{section.name}</h2>
            <div className={cn(
              "size-2 rounded-full",
              section.status === "good"
                ? "bg-teal-500 dark:bg-teal-300"
                : section.status === "bad"
                  ? "bg-red-500"
                  : "bg-yellow-400 animate-pulse",
            )} />
          </div>
        </TabSelector>
      ))
}