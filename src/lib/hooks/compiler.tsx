"use client";

import { createContext, useState } from "react";

const CompilerContext = createContext<string | null>(null);

export function useCompiler() {
  const context = CompilerContext;
  if (context === null) {
    throw new Error("useCompiler must be used within a CompilerProvider");
  }
  return context;
}

export function CompilerProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState<string>("");

  return (
    <CompilerContext.Provider value="jmm">{children}</CompilerContext.Provider>
  );
}
