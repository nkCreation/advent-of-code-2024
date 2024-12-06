import { readLines } from "https://deno.land/std@0.101.0/io/bufio.ts";

export async function readFileLineByLine(filePath: string): Promise<string[]> {
  const file = await Deno.open(filePath);
  const lines: string[] = [];
  for await (const l of readLines(file)) {
    lines.push(l);
  }

  file.close();

  return lines;
}
