import { expect } from "jsr:@std/expect/expect";
import {
  isAllUnique,
  isBetweenStep,
  isDecreasing,
  isIncreasing,
  isSafeReportsWithTolerance,
  isStrictlySafeReports,
} from "./day2.ts";

const arrayIncreasing = [1, 3, 5, 9, 12];
const arrayNonIncreasing = [43, 42, 44, 48, 50, 56];
const arrayIncreasingNonUnique = [1, 3, 3, 9, 12];
const arrayDecreasing = [14, 10, 8, 5, 2];
const arrayNonDecreasing = [14, 10, 11, 5, 2];

const example = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

Deno.test("increasing array", () => {
  expect(!!isIncreasing(arrayIncreasing)).toBe(true);
  expect(!!isIncreasing(arrayNonIncreasing)).toBe(false);
});

Deno.test("non unique items in array", () => {
  expect(!!isIncreasing(arrayIncreasingNonUnique)).toBe(true);
  expect(isAllUnique(arrayIncreasingNonUnique)).toBe(false);
});

Deno.test("decreasing array", () => {
  expect(!!isDecreasing(arrayDecreasing)).toBe(true);
  expect(!!isDecreasing(arrayNonDecreasing)).toBe(false);
});

Deno.test("each number between a step", () => {
  expect(isBetweenStep(arrayIncreasing, 3)).toBe(false);
  expect(isBetweenStep(arrayIncreasing, 4)).toBe(true);
});

Deno.test("strict safe reports", () => {
  expect(isStrictlySafeReports(example)).toBe(2);
});
Deno.test("non strict safe reports", () => {
  expect(isSafeReportsWithTolerance(example)).toBe(4);
});
