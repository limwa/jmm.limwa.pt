"use client";

import { compileJmm, type ProtocolSection } from "@/app/actions";
import { useDebounce } from "@uidotdev/usehooks";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createLifetime } from "../ui/utils/lifetime";
import { decode, encode } from "../utils/base64";

type CompilerContextData = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  optimizations: boolean;
  setOptimizations: Dispatch<SetStateAction<boolean>>;
  registerAllocation: boolean;
  setRegisterAllocation: Dispatch<SetStateAction<boolean>>;

  outputSections: ProtocolSection[];
};

const CompilerContext = createContext<CompilerContextData | null>(null);

export function useCompilerContext() {
  const context = useContext(CompilerContext);
  if (context === null) {
    throw new Error("useCompiler must be used within a CompilerProvider");
  }
  return context;
}

function useCompiler({ initialCode, initialOptimizations, initialRegisterAllocation }: { initialCode: string, initialOptimizations: boolean, initialRegisterAllocation: boolean }) {
  const [code, setCode] = useState(initialCode);
  const [optimizations, setOptimizations] = useState(initialOptimizations);
  const [registerAllocation, setRegisterAllocation] = useState(initialRegisterAllocation);

  const compilationFlags = useMemo(() => ({ optimizations, registerAllocation }), [optimizations, registerAllocation]);

  const debouncedCode = useDebounce(code, 3000);
  const debouncedCompilationFlags = useDebounce(compilationFlags, 1000);

  const [compiling, startTransition] = useTransition();
  const [outputSections, setOutputSections] = useState<ProtocolSection[]>([
    {
      name: "Waiting for input...",
      uuid: "waiting-for-input",
      status: "pending",
      content: "",
    },
  ]);

  useEffect(() => {
    const lifetime = createLifetime();

    const { registerAllocation: debouncedRegisterAllocation, optimizations: debouncedOptimizations } = debouncedCompilationFlags;
    const encodedCode = encode(debouncedCode);
    if (encodedCode !== null) {
      const params = new URLSearchParams();
      params.set("optimizations", debouncedOptimizations ? "true" : "false");
      params.set("registerAllocation", debouncedRegisterAllocation ? "true" : "false");
      params.set("code", encodedCode);

      window.history.replaceState(
        null,
        "",
        new URL(`?${params}`, document.location.href),
      );
    }

    startTransition(async () => {
      const fd = new FormData();
      fd.set("optimizations", debouncedOptimizations ? "true" : "false");
      fd.set("registerAllocation", debouncedRegisterAllocation ? "true" : "false");
      fd.set("code", debouncedCode);

      const newOutputSections = await compileJmm(fd);
      lifetime.runIfMounted(() => setOutputSections(newOutputSections));
    });

    return lifetime.createCleanup();
  }, [debouncedCode, debouncedCompilationFlags]);

  return {
    code,
    setCode,
    registerAllocation,
    setRegisterAllocation,
    optimizations,
    setOptimizations,
    outputSections,
    compiling,
  };
}

export function CompilerProvider({
  initialCode,
  initialOptimizations,
  initialRegisterAllocation,
  children,
}: {
  initialCode: string;
  initialOptimizations: boolean;
  initialRegisterAllocation: boolean;
  children: React.ReactNode;
}) {
  const compiler = useCompiler({ initialCode, initialOptimizations, initialRegisterAllocation });

  return (
    <CompilerContext.Provider value={compiler}>
      {children}
    </CompilerContext.Provider>
  );
}
