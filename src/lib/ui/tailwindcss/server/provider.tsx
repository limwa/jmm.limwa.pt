import "server-only";

import { BreakpointClientBridge } from "../client/bridge";
import { resolveProjectConfig } from "./config";

export async function BreakpointProvider({ children }: { children: React.ReactNode }) {
    const resolvedConfig = resolveProjectConfig();
    const breakpoints = resolvedConfig.theme.screens;

    return (
        <BreakpointClientBridge breakpoints={breakpoints}>
            {children}
        </BreakpointClientBridge>
    )
}