import { expect } from "jsr:@std/expect/expect";
import {
  compactFileDiskInstructions,
  computeCheckSum,
  diskMapToBlock,
  diskMapToCheksumByBlock,
  diskMapToCheksumByFile,
} from "./day9.ts";

const exampleDiskMap = "2333133121414131402";
const resultInstructions = [
  0,
  0,
  ".",
  ".",
  ".",
  1,
  1,
  1,
  ".",
  ".",
  ".",
  2,
  ".",
  ".",
  ".",
  3,
  3,
  3,
  ".",
  4,
  4,
  ".",
  5,
  5,
  5,
  5,
  ".",
  6,
  6,
  6,
  6,
  ".",
  7,
  7,
  7,
  ".",
  8,
  8,
  8,
  8,
  9,
  9,
];
const resultInstructionsByFile = [
  [0, 0],
  [".", ".", "."],
  [1, 1, 1],
  [".", ".", "."],
  [2],
  [".", ".", "."],
  [3, 3, 3],
  ["."],
  [4, 4],
  ["."],
  [5, 5, 5, 5],
  ["."],
  [6, 6, 6, 6],
  ["."],
  [7, 7, 7],
  ["."],
  [8, 8, 8, 8],
  [9, 9],
];
const sortedInstructionsResultByFile = [
  0,
  0,
  9,
  9,
  2,
  1,
  1,
  1,
  7,
  7,
  7,
  ".",
  4,
  4,
  ".",
  3,
  3,
  3,
  ".",
  ".",
  ".",
  ".",
  5,
  5,
  5,
  5,
  ".",
  6,
  6,
  6,
  6,
  ".",
  ".",
  ".",
  ".",
  ".",
  8,
  8,
  8,
  8,
  ".",
  ".",
];
const sortedInstructionsResult = [
  0,
  0,
  9,
  9,
  8,
  1,
  1,
  1,
  8,
  8,
  8,
  2,
  7,
  7,
  7,
  3,
  3,
  3,
  6,
  4,
  4,
  6,
  5,
  5,
  5,
  5,
  6,
  6,
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
];

Deno.test("transform disk map to block instructions", () => {
  expect(diskMapToBlock(exampleDiskMap)).toEqual(resultInstructions);
});

Deno.test("compact file disk instructions", () => {
  expect(compactFileDiskInstructions(resultInstructions)).toEqual(
    sortedInstructionsResult,
  );
});

Deno.test("compact file disk instructions by file", () => {
  expect(compactFileDiskInstructions(resultInstructionsByFile, true)).toEqual(
    sortedInstructionsResultByFile,
  );
});

Deno.test("compute checksum for file", () => {
  expect(computeCheckSum(sortedInstructionsResult)).toBe(1928);
  expect(diskMapToCheksumByBlock(exampleDiskMap)).toBe(1928);
});

Deno.test("compute checksum for file by file", () => {
  expect(computeCheckSum(sortedInstructionsResultByFile)).toBe(2858);
  expect(diskMapToCheksumByFile(exampleDiskMap)).toBe(2858);
});
