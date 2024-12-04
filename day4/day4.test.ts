import { expect } from "jsr:@std/expect/expect";
import {
  findIntersectingVectors,
  getPossibleSiblings,
  possibleDirections,
  searchWordsInMatrix,
  xDirections,
} from "./day4.ts";

const testWordSearch = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];

Deno.test("get siblings", () => {
  expect(
    Array.from(getPossibleSiblings(0, 0, testWordSearch, possibleDirections)),
  ).toEqual([
    ["r", "M"],
    ["b", "M"],
    ["br", "S"],
  ]);

  expect(
    Array.from(getPossibleSiblings(3, 3, testWordSearch, possibleDirections)),
  ).toEqual([
    ["tl", "X"],
    ["t", "S"],
    ["tr", "X"],
    ["l", "A"],
    ["r", "A"],
    ["bl", "A"],
    ["b", "S"],
    ["br", "A"],
  ]);

  expect(
    Array.from(getPossibleSiblings(9, 9, testWordSearch, possibleDirections)),
  ).toEqual([
    ["tl", "M"],
    ["t", "M"],
    ["l", "S"],
  ]);
});

Deno.test("find words in matrix", () => {
  expect(searchWordsInMatrix(testWordSearch, "XMAS").size).toEqual(18);
});

Deno.test("find MAS in matrix only in diagonal", () => {
  expect(searchWordsInMatrix(testWordSearch, "MAS", xDirections).size).toEqual(
    25,
  );
});

Deno.test("find intersecting vectors", () => {
  expect(
    findIntersectingVectors(["1,1|3,3", "2,2|4,4", "3,3|5,5", "5,5|3,3"]),
  ).toHaveLength(1);
});

Deno.test("intersecting X-MAS from example", () => {
  expect(
    findIntersectingVectors(
      Array.from(searchWordsInMatrix(testWordSearch, "MAS", xDirections)),
    ).length,
  ).toEqual(9);
});
