"use client";

import type { Breakpoints } from "../server/config";
import { BreakpointsContext } from "./hooks/context";

export function BreakpointClientBridge({ breakpoints, children }: { breakpoints: Breakpoints, children: React.ReactNode }) {
    return (
        <BreakpointsContext.Provider value={breakpoints}>
            {children}
        </BreakpointsContext.Provider>
    );
}