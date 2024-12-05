import { expect } from "jsr:@std/expect/expect";
import {
  correctInvalidUpdate,
  findMiddlePage,
  findValidUpdates,
  middlePagesSumFromInvalidUpdatesCorrected,
  middlePagesSumFromValidUpdates,
  updateIsValid,
} from "./day5.ts";

const updateTest = [
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];
const pagesRules = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
];

Deno.test("update is valid", () => {
  expect(updateIsValid(updateTest[0], pagesRules)).toBe(true);
  expect(updateIsValid(updateTest[1], pagesRules)).toBe(true);
  expect(updateIsValid(updateTest[2], pagesRules)).toBe(true);
  expect(updateIsValid(updateTest[4], pagesRules)).toBe(false);
  expect(updateIsValid(updateTest[5], pagesRules)).toBe(false);
});

Deno.test("how many updates are valid", () => {
  expect(findValidUpdates(updateTest, pagesRules).length).toBe(3);
});

Deno.test("find middle page", () => {
  expect(findMiddlePage(updateTest[0].split(","))).toBe("61");
  expect(findMiddlePage(updateTest[1].split(","))).toBe("53");
});

Deno.test("sum of middle pages from valid updates", () => {
  expect(middlePagesSumFromValidUpdates(updateTest, pagesRules)).toBe(143);
});

Deno.test("correct invalid update", () => {
  expect(correctInvalidUpdate(updateTest[3], pagesRules)).toEqual([
    "97",
    "75",
    "47",
    "61",
    "53",
  ]);

  expect(correctInvalidUpdate(updateTest[4], pagesRules)).toEqual([
    "61",
    "29",
    "13",
  ]);
});

Deno.test("sum of middles pages of corrected invalid updates", () => {
  expect(
    middlePagesSumFromInvalidUpdatesCorrected(updateTest, pagesRules),
  ).toBe(123);
});
