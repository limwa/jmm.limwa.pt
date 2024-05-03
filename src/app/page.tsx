export const metadata: Metadata = {
  title: "jmm.limwa.pt",
  description: "An application to compile Java-- code",
};

import type { Metadata } from "next";
import { Inner } from "./inner";
import { decode } from "@/lib/utils/base64";

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const code =
    typeof searchParams["code"] !== "string" ? null : searchParams["code"];
  const decodedCode = code !== null ? decode(code) : null;
  const noTabsCode =
    decodedCode === null ? null : decodedCode.replaceAll("\t", "    ");
  return <Inner initialCode={noTabsCode} />;
}
