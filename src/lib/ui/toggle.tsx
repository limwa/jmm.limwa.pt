import { useCompilerContext } from "../hooks/compiler";
import { cn } from "./utils/cn";

function Toggle({ name, enabled, setEnabled }: { name: string, enabled: boolean, setEnabled: (val: boolean) => void }) {

  return (
    <label className="select-none flex flex-wrap gap-x-2 gap-y-1 px-4 py-2 items-center justify-center bg-neutral-200 dark:bg-neutral-800 hover:opacity-95 transition-opacity">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={enabled}
        onChange={(ev) => setEnabled(ev.currentTarget.checked)}
      />
        <span
        className="font-light tracking-widest transition-colors dark:text-white"
        >
        {name}
        </span>
      <span className={cn("rounded-md px-2 w-10 text-center uppercase font-bold text-sm font-mono transition-colors", !enabled && "bg-red-500 text-red-950", enabled && "text-teal-950 bg-teal-500 dark:bg-teal-300")}>
        {enabled ? "On": "Off"}
      </span>
    </label>
  );
}

export function OptimizationsToggle() {
    const { optimizations, setOptimizations } = useCompilerContext();
    return <Toggle name="Optimizations" enabled={optimizations} setEnabled={setOptimizations} />;
}

export function RegisterAllocationToggle() {
    const { registerAllocation, setRegisterAllocation } = useCompilerContext();
    return <Toggle name="Register Allocation" enabled={registerAllocation} setEnabled={setRegisterAllocation} />;
}