import { writeTextToFile } from "../helpers/parse.ts";

export function diskMapToBlock<
  T extends boolean,
  R = T extends true ? (string | number)[][] : (string | number)[],
>(diskMap: string, wholeFile?: T): R {
  const instructions = diskMap.split("").reduce(
    (instructions, diskMapBlock, index) => {
      instructions[0].push(
        new Array(parseInt(diskMapBlock)).fill(
          index % 2 === 0 ? instructions[1] : ".",
        ),
      );

      if (index % 2 === 0) {
        instructions[1]++;
      }

      return instructions;
    },
    [[], 0] as [Array<Array<string | number>>, number],
  );

  return (wholeFile ? instructions[0] : instructions[0].flat(1)) as R;
}

export function compactFileDiskInstructions<
  ByFile extends boolean,
  InstructionsType = ByFile extends true ? (string | number)[][]
    : (string | number)[],
>(instructions: InstructionsType, byFile?: ByFile): Array<string | number> {
  const sortedInstructions = !byFile
    ? (instructions as (string | number)[]).reduce(
      (acc, val, index) => {
        const lastValIndex = acc.findLastIndex((i) => i !== ".");
        if (val === "." && lastValIndex > index) {
          acc.splice(index, 1, acc[lastValIndex]);
          acc.splice(lastValIndex, 1, ".");
        }

        return acc;
      },
      [...(instructions as (string | number)[])],
    )
    : (instructions as (string | number)[][])
      .reduceRight((acc, val) => {
        if (val[0] !== ".") {
          const findFirstFreeSpace = acc.findIndex(
            (i) => i[0] === "." && i.length >= val.length,
          );
          const itemIndexToRemove = acc.findIndex(
            (item) => item.join("") === val.join(""),
          );

          if (
            findFirstFreeSpace > 0 &&
            findFirstFreeSpace < itemIndexToRemove
          ) {
            const isSameSize = acc[findFirstFreeSpace].length === val.length;

            if (acc[findFirstFreeSpace].length > val.length) {
              acc[findFirstFreeSpace].splice(0, val.length);
            }

            acc.splice(itemIndexToRemove, 1, new Array(val.length).fill("."));
            acc.splice(findFirstFreeSpace, isSameSize ? 1 : 0, val);

            return acc;
          }
        }

        return acc;
      }, JSON.parse(JSON.stringify(instructions)) as (string | number)[][])
      .flat(1);

  return sortedInstructions;
}

export function computeCheckSum(instructions: Array<string | number>): number {
  return instructions.reduce((acc, val, index) => {
    if (typeof val === "string") {
      return acc;
    }

    if (typeof val === "number") {
      (acc as number) += index * val;
    }

    return acc;
  }, 0 as number) as number;
}

export function diskMapToCheksumByBlock(diskMap: string) {
  const instructions = diskMapToBlock(diskMap, false);
  const compactInstructions = compactFileDiskInstructions(instructions, false);
  const checksum = computeCheckSum(compactInstructions);

  return checksum;
}

export function diskMapToCheksumByFile(diskMap: string) {
  const instructions = diskMapToBlock(diskMap, true);
  const compactInstructions = compactFileDiskInstructions(instructions, true);
  const checksum = computeCheckSum(compactInstructions);

  return checksum;
}
