"use server";

import "server-only";
import { $ } from "dax-sh";
import fs from "fs/promises";
import path from "path";

const protocolRegex =
  /<section uuid="(?<uuid>.*?)" name="(?<name>.*?)">\n(?<content>(.|\n)*?)\n<endsection uuid="\k<uuid>" status="(?<status>good|bad|pending)">/g;

export type ProtocolSection = {
  uuid: string;
  name: string;
  status: "good" | "bad" | "pending";
  content: string;
};

export async function compileJmm(fd: FormData): Promise<ProtocolSection[]> {
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
  const process = await $`./jmm/bin/jmm -d -o -r=0 -i=${inputFile}`
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
        status: status as ProtocolSection["status"], // Ensured by the regex
        content: content.trim(),
      });
    }

    if (sections.length === 0) {
      console.error({
        type: "Compilation Error",
        stderr: process.stderr,
      });

      return [{
        uuid: "internal-error",
        name: "Internal Error",
        content:
          "An unknown error occurred, please try again or contact an administrator.",
        status: "bad",
      }]
    }

    return sections;
  } catch (e) {
    console.error(e);
    return [
      {
        uuid: "internal-error",
        name: "Internal Error",
        content:
          "An unknown error occurred, please try again or contact an administrator.",
        status: "bad",
      },
    ];
  }
}
