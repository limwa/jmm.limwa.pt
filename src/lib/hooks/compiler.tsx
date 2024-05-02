"use client";

import { compileJmm, type ProtocolSection } from "@/app/actions";
import { useDebounce } from "@uidotdev/usehooks";
import {
  createContext,
  useContext,
  useEffect,
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

function getCodeFromUrl() {
  const params = new URLSearchParams(document.location.search);
  const encodedCode = params.get("code");

  if (!encodedCode) return;

  const code = decode(encodedCode);
  if (!!code) return code;
}

function useCompiler({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(getCodeFromUrl() ?? initialCode);
  const debouncedCode = useDebounce(code, 3000);

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

    const encodedCode = encode(debouncedCode);
    if (!!encodedCode) {
      const params = new URLSearchParams();
      params.set("code", encodedCode);

      window.history.replaceState(
        null,
        "",
        new URL(`?${params}`, document.location.href),
      );
    }

    startTransition(async () => {
      const fd = new FormData();
      fd.set("code", debouncedCode);

      const newOutputSections = await compileJmm(fd);
      lifetime.runIfMounted(() => setOutputSections(newOutputSections));
    });

    return lifetime.createCleanup();
  }, [debouncedCode]);

  return {
    code,
    setCode,
    outputSections,
    compiling,
  };
}

export function CompilerProvider({
  initialCode,
  children,
}: {
  initialCode: string;
  children: React.ReactNode;
}) {
  const compiler = useCompiler({ initialCode });

  return (
    <CompilerContext.Provider value={compiler}>
      {children}
    </CompilerContext.Provider>
  );
}
