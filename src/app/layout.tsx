import { Inter } from "next/font/google";
import { BreakpointProvider } from "@/lib/ui/tailwindcss/server/provider";
import "./globals.css";
import { CloudflareAnalytics } from "@/lib/analytics/cloudflare";

const inter = Inter({ subsets: ["latin"] });

const analyticsProvider = process.env.ANALYTICS_PROVIDER;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BreakpointProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          {analyticsProvider === "cloudflare" && <CloudflareAnalytics />} 
        </body>
      </html>
    </BreakpointProvider>
  );
}
