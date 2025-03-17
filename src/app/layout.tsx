import { Inter } from "next/font/google";
import { BreakpointProvider } from "@/lib/ui/tailwindcss/server/provider";
import { AnalyticsProvider } from "@/lib/analytics/provider";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BreakpointProvider>
      <html lang="en">
        <body className={inter.className}>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </body>
      </html>
    </BreakpointProvider>
  );
}
