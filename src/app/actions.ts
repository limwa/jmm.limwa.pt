"use server";

import "server-only";
import { $ } from "dax-sh";
import fs from "fs/promises";
import path from "path";

const outputRegex = /<output>(.|\n)*<endoutput>/;
const protocolRegex =
  /<section uuid="(?<uuid>.*?)" name="(?<name>.*?)">\n(?<content>(?:.|\n)*?)\n<endsection uuid="\k<uuid>" status="(?<status>good|bad|pending)">/g;

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

const adminInfo = (process.env.ADMIN_CONTACT_INFO ?? "").replaceAll(/^(?: *\n)+|(?<=\n) *(?=\n)|(?<=\n)(?: *\n)+$/g, "");

const internalServerError: ProtocolSection = {
  uuid: "internal-error",
  name: "Internal Error",
  status: "bad",
  content:
    `An unknown error occurred, please try again or contact an administrator.\n\n${adminInfo}`,
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

  const registerAllocationFd = fd.get("registerAllocation");
  if (registerAllocationFd === null || typeof registerAllocationFd !== "string" || !["true", "false"].includes(registerAllocationFd)) {
    return [
      {
        uuid: "bad-input",
        name: "Input",
        content: "No register allocation provided",
        status: "bad",
      },
    ];
  }

  const registerAllocation = registerAllocationFd === "true";

  const optimizationsFd = fd.get("optimizations");
  if (optimizationsFd === null || typeof optimizationsFd !== "string" || !["true", "false"].includes(optimizationsFd)) {
    return [
      {
        uuid: "bad-input",
        name: "Input",
        content: "No optimizations provided",
        status: "bad",
      },
    ];
  }

  const optimizations = optimizationsFd === "true";

  const dir = await fs.mkdtemp("/tmp/jmm-compile-");

  const inputFile = path.join(dir, "input.jmm");
  await fs.writeFile(inputFile, code, { encoding: "utf-8" });

  const args = [
    "-d",
    `-i=${inputFile}`,
  ]

  if (optimizations) args.push("-o");
  if (registerAllocation) args.push("-r=0");
  
  const process = await $`./jmm/bin/jmm ${args}`
    .stdout("piped")
    .stderr("piped")
    .cwd("./compiler")
    .noThrow()
    .printCommand();

  try {
    await fs.rm(dir, { recursive: true, force: true });

    const output = parseOutput(process.stdout);
    if (!output.success) {
      console.error({
        type: "Compiler Internal Error",
        code,
        stderr: process.stderr,
      });

      return [internalServerError];
    }

    return output.sections;
  } catch (e) {
    console.error({ type: "Runtime Internal Error", stderr: e });
    return [internalServerError];
  }
}
