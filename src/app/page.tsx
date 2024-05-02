export const metadata: Metadata = {
  title: "jmm.limwa.pt",
  description: "An application to compile Java-- code",
};

import type { Metadata } from "next";
import { Inner } from "./inner";

export default function Home() {
  return <Inner />
}
