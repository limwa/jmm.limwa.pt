import { env } from "@/env";
import { CloudflareAnalyticsProvider } from "./cloudflare";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  if (env.ANALYTICS_PROVIDER === "cloudflare") {
    return (
      <CloudflareAnalyticsProvider token={env.CLOUDFLARE_ANALYTICS_TOKEN}>
        {children}
      </CloudflareAnalyticsProvider>
    );
  }

  return <>{children}</>;
}
