import "server-only";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";

type ResolvedConfig = ReturnType<typeof resolveProjectConfig>;
export type Breakpoints = ResolvedConfig["theme"]["screens"];

export function resolveProjectConfig() {
    return resolveConfig(tailwindConfig);
}
