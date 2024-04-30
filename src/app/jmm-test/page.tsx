import type { Metadata } from "next";
import { Compile } from "./compile";

export const metadata: Metadata = {
  title: "COMP2023",
  description: "An application to compile Java-- code",
};

export default function Home() {

  return (
    <main className="p-4 h-dvh bg-slate-800 text-white flex flex-col">
      <h1 className="font-mono text-3xl font-bold">COMP2023</h1>
      <Compile />
    </main>
  );
}
