"use server";

import { $ } from "dax-sh";
import fs from "fs/promises";
import path from "path";

export async function compileJmm(
  _prevState: string[],
  fd: FormData
) {
  const code = fd.get("code");
  if (code === null || typeof code !== "string") {
    return ["", "No code provided"];
  }

  const dir = await fs.mkdtemp("/tmp/jmm-compile-");

  const inputFile = path.join(dir, "input.jmm");

  await fs.writeFile(inputFile, code, { encoding: "utf-8" });

  const process = await $`./jmm/bin/jmm -d -i=${inputFile}`.stdout("piped").stderr("piped").noThrow();
  return [process.stdout, process.stderr]
}
