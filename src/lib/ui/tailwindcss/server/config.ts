import "server-only";

type ResolvedConfig = ReturnType<typeof resolveProjectConfig>;
export type Breakpoints = ResolvedConfig["theme"]["screens"];

export function resolveProjectConfig() {
  return {
    theme: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      }
    }
  };
}
