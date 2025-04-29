import "server-only";

import { BreakpointClientBridge } from "../client/bridge";
import { resolveProjectConfig } from "./config";

export async function BreakpointProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  return (
    <BreakpointClientBridge breakpoints={breakpoints}>
      {children}
    </BreakpointClientBridge>
  );
}
