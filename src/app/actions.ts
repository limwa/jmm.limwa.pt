"use server";

import "server-only";
import { $ } from "dax-sh";
import fs from "fs/promises";
import path from "path";

const outputRegex = /<output>(.|\n)*<endoutput>/;
const protocolRegex =
  /<section uuid="(?<uuid>.*?)" name="(?<name>.*?)">\n(?<content>(.|\n)*?)\n<endsection uuid="\k<uuid>" status="(?<status>good|bad|pending)">/g;

type ParsedOutput =
  | {
      success: false;
    }
  | {
      success: true;
      sections: ProtocolSection[];
    };

export type ProtocolSection = {
  uuid: string;
  name: string;
  status: "good" | "bad" | "pending";
  content: string;
};

const internalServerError: ProtocolSection = {
  uuid: "internal-error",
  name: "Internal Error",
  status: "bad",
  content:
    "An unknown error occurred, please try again or contact an administrator.",
};

function parseOutput(output: string): ParsedOutput {
  const match = output.match(outputRegex);
  if (!match) {
    return { success: false };
  }

  const sectionMatches = match[0].matchAll(protocolRegex);
  const sections: ProtocolSection[] = [];
  
  for (const sectionMatch of sectionMatches) {
    const { name, uuid, status, content } = sectionMatch.groups!;

    const trimmedContent = content.trim();
    if (!trimmedContent) continue;

    sections.push({
      name,
      uuid,
      status: status as ProtocolSection["status"],
      content: trimmedContent,
    });
  }

  return { success: true, sections };
}

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
    .cwd("./compiler")
    .noThrow();

  try {
    await fs.rm(dir, { recursive: true, force: true });

    const output = parseOutput(process.stdout);
    if (!output.success) {
      console.error({
        type: "Compilation Error",
        stderr: process.stderr,
      });

      return [internalServerError];
    }

    return output.sections;
  } catch (e) {
    console.error({ type: "Runtime Error", stderr: e });
    return [internalServerError];
  }
}
