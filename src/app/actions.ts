"use server";

import "server-only";
import { $ } from "dax-sh";
import fs from "fs/promises";
import path from "path";

const protocolRegex =
  /<section uuid="(?<uuid>.*?)" name="(?<name>.*?)">\n(?<content>(.|\n)*?)\n<endsection uuid="\k<uuid>" status="(?<status>good|bad)">/g;

export type ProtocolSection = {
  uuid: string;
  name: string;
  status: "good" | "bad";
  content: string;
};

export async function compileJmm(_state: ProtocolSection[], fd: FormData): Promise<ProtocolSection[]> {
  const code = fd.get("code");
  if (code === null || typeof code !== "string") {
    return [
      {
        uuid: "bad-input",
        name: "Input",
        content: "No code provided",
        status: "bad",
      },
    ];
  }

  const dir = await fs.mkdtemp("/tmp/jmm-compile-");

  const inputFile = path.join(dir, "input.jmm");

  await fs.writeFile(inputFile, code, { encoding: "utf-8" });
  const process = await $`./jmm/bin/jmm -d -r=1 -i=${inputFile}`
    .stdout("piped")
    .stderr("piped")
    .noThrow();

  try {
  await fs.rm(dir, { recursive: true, force: true });

  const matches = process.stdout.matchAll(protocolRegex);

  const sections: ProtocolSection[] = [];
  for (const match of matches) {
    const { name, uuid, status, content } = match.groups!;
    sections.push({
      name,
      uuid,
      status: status as "good" | "bad", // Ensured by the regex
      content: content.trim(),
    });
  }

  return sections;
} catch (e) {
  console.error(e);
  return [
    {
      uuid: "internal-error",
      name: "Internal Error",
      content: "An unknown error occurred, please try again or contact an administrator.",
      status: "bad",
    }
  ]
}
}
