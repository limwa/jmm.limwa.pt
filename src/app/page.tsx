export const metadata: Metadata = {
  title: env.APP_TITLE,
  description: env.APP_DESCRIPTION,
};

import type { Metadata } from "next";
import { Inner } from "./inner";
import { decode } from "@/lib/utils/base64";
import { lastModified } from "./meta";
import { env } from "@/env";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const code =
    typeof searchParams["code"] !== "string" ? null : searchParams["code"];
  const decodedCode = code !== null ? decode(code) : null;
  const noTabsCode =
    decodedCode === null ? null : decodedCode.replaceAll("\t", "    ");

  const registerAllocation =
    typeof searchParams["registerAllocation"] === "string"
      ? searchParams["registerAllocation"] === "true"
      : null;

  const optimizations =
    typeof searchParams["optimizations"] === "string"
      ? searchParams["optimizations"] === "true"
      : null;

  return (
    <Inner
      initialCode={noTabsCode}
      initialOptimizations={optimizations}
      initialRegisterAllocation={registerAllocation}
      lastUpdated={await lastModified}
    />
  );
}
