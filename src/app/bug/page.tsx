import { env } from "@/env";
import type { Metadata } from "next";
import { lastModified } from "../meta";
import { Inner } from "./inner";

export const metadata: Metadata = {
  title: env.APP_TITLE,
  description: env.APP_DESCRIPTION,
};

export default async function BugPage() {
  return <Inner lastUpdated={await lastModified} />;
}