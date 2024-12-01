import { expect } from "jsr:@std/expect";
import {
  calculateDistance,
  calculateSimilarity,
  countOccurrences,
  countSimilarity,
  findTotalDistance,
} from "./index.ts";

const list1 = [3, 4, 2, 1, 3, 3];
const list2 = [4, 3, 5, 3, 9, 3];

Deno.test("right distance", () => {
  expect(calculateDistance(6, 12)).toBe(6);
});

Deno.test("sort and find", () => {
  expect(findTotalDistance(list1, list2)).toBe(11);
});

Deno.test("count occurrences", () => {
  expect(countOccurrences(3, list2)).toBe(3);
});

Deno.test("count similarity", () => {
  expect(countSimilarity(3, list2)).toBe(9);
});

Deno.test("total similarity", () => {
  expect(calculateSimilarity(list1, list2)).toBe(31);
});
