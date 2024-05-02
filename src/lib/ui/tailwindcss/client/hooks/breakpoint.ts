"use client";

import { useEffect, useState } from "react";
import type { Breakpoints } from "../../server/config";
import { useBreakpointsContext } from "./context";

export function useBreakpoint(breakpoint: keyof Breakpoints): { loading: true } | { loading: false; active: boolean } {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  const breakpoints = useBreakpointsContext();
  const breakpointWidth = breakpoints[breakpoint];

  useEffect(() => {
    setLoading(false);
    
    const query = window.matchMedia(`(min-width: ${breakpointWidth})`);
    const controller = new AbortController();

    query.addEventListener("change", (ev) => setActive(ev.matches), {
      signal: controller.signal,
    });

    setActive(query.matches);

    return () => controller.abort();
  }, [breakpointWidth]);

  if (loading) {
    return { loading: true } as const;
  }

  return { loading, active };
}
