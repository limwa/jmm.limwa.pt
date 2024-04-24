import { Inter } from "next/font/google";
import { BreakpointProvider } from "@/lib/ui/tailwindcss/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BreakpointProvider>
      <html className="dark" lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </BreakpointProvider>
  );
}
