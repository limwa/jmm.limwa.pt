import { env } from "@/env";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: env.APP_TITLE,
  description: env.APP_DESCRIPTION,
};

export default async function BugPage() {
  return <div>Bug report page - under construction</div>;
}