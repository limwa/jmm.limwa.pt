import { useCompilerContext } from "@/lib/hooks/compiler";
import { TabContent } from "../tabs/content";

export function OutputTabContents() {
  const { outputSections } = useCompilerContext();

  return outputSections.map((section) => (
    <TabContent key={section.uuid} name={section.name}>
      <div className="overflow-auto bg-neutral-50 text-black outline-2 -outline-offset-2 outline-teal-500 focus-visible:outline dark:bg-neutral-950 dark:text-white dark:outline-teal-300">
        <pre className="block w-max p-4 selection:bg-neutral-400/30">
          {section.content}
        </pre>
      </div>
    </TabContent>
  ));
}
