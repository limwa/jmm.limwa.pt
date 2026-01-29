import { env } from "@/env";
import type { Metadata } from "next";
import { lastModified } from "../meta";
import { Inner } from "./inner";

export const metadata: Metadata = {
  title: env.APP_TITLE,
  description: env.APP_DESCRIPTION,
};

export default async function BugPage({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const errorMessage = typeof searchParams.error === "string" ? searchParams.error : "";

  return <Inner errorMessage={errorMessage} lastUpdated={await lastModified} />;
}