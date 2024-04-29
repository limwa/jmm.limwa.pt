import { useEffect, useState } from "react";
import type { Breakpoints } from "../../server/config";
import { useBreakpointsContext } from "./context";

export function useBreakpoint(breakpoint: keyof Breakpoints) {
  const [active, setActive] = useState(false);

  const breakpoints = useBreakpointsContext();
  const breakpointWidth = breakpoints[breakpoint];

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${breakpointWidth})`);
    const controller = new AbortController();

    query.addEventListener("change", (ev) => setActive(ev.matches), {
      signal: controller.signal,
    });

    setActive(query.matches);

    return () => controller.abort();
  }, [breakpointWidth]);

  return active;
}
