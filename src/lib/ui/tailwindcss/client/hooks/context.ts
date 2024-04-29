import { createContext, useContext } from "react";
import type { Breakpoints } from "../../server/config";

export const BreakpointsContext = createContext<Breakpoints | null>(null);

export function useBreakpointsContext() {
  const breakpoints = useContext(BreakpointsContext);

  if (!breakpoints) {
    throw new Error(
      "useBreakpointsContext must be used within a TailwindContext.Provider",
    );
  }

  return breakpoints;
}
