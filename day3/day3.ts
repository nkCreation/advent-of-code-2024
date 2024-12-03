export const MUL_REGEX = /mul\(([\d]{1,3}),([\d]{1,3})\)/gm;
export const MUL_REGEX_DOS =
  /mul\(([\d]{1,3}),([\d]{1,3})\)|do\(\)|don't\(\)/gm;

export function findMulInstructions(
  testString: string,
  regex: RegExp = MUL_REGEX,
): RegExpMatchArray | null {
  return testString.match(regex);
}

export function evalMulInstruction(instruction?: string): number[] {
  if (!instruction) return [];

  const result = [...instruction.matchAll(MUL_REGEX)].flat(2);

  if (!result) {
    return [];
  }

  return [parseInt(result[1]), parseInt(result[2])];
}

export function computeMulInstructions(instructions: string[]): number {
  return instructions.reduce((acc, instruction) => {
    const [a, b] = evalMulInstruction(instruction);
    const result = a * b;

    acc += result;

    return acc;
  }, 0);
}

export function filterInstructions(
  instructions: RegExpMatchArray | null,
): string[] {
  if (!instructions) return [];

  const [filteredInstructions] = instructions.reduce(
    (acc, instruction) => {
      if (instruction === "don't()") {
        acc[1] = false;
      }

      if (instruction === "do()") {
        acc[1] = true;
      }

      if (acc[1] && instruction.includes("mul")) {
        acc[0].push(instruction);
      }

      return acc;
    },
    [[], true] as [string[], boolean],
  );

  return filteredInstructions;
}

export function executeMulInstructions(program: string): number {
  const instructions = findMulInstructions(program);

  if (!instructions) return 0;

  return computeMulInstructions(instructions);
}

export function executeMulInstructionsWithDos(program: string): number {
  const instructions = filterInstructions(
    findMulInstructions(program, MUL_REGEX_DOS),
  );

  if (!instructions) return 0;

  return computeMulInstructions(instructions);
}
