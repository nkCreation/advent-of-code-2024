import { expect } from "jsr:@std/expect/expect";
import {
  Calcul,
  calculsThatCanBeResolved,
  combineOperators,
  countValidCalculs,
  Operator,
  sumOfValidCalculs,
} from "./day7.ts";

const dataTest: Calcul[] = [
  ["190", ["10", "19"]],
  ["3267", ["81", "40", "27"]],
  ["83", ["17", "5"]],
  ["156", ["15", "6"]],
  ["7290", ["6", "8", "6", "15"]],
  ["161011", ["16", "10", "13"]],
  ["192", ["17", "8", "14"]],
  ["21037", ["9", "7", "18", "13"]],
  ["292", ["11", "6", "16", "20"]],
];

const complexOperators: Operator[] = ["*", "+", "||"];

Deno.test("test combinations of operators", () => {
  expect(combineOperators(2, ["*", "+"])).toEqual(["*,*", "+,*", "*,+", "+,+"]);
});

Deno.test("result can be resolved", () => {
  expect(calculsThatCanBeResolved("190", ["10", "19"])).toBe(true);
  expect(calculsThatCanBeResolved("3267", ["81", "40", "27"])).toBe(true);
  expect(calculsThatCanBeResolved("83", ["17", "5"])).toBe(false);
});

Deno.test("how many results can be resolved", () => {
  expect(countValidCalculs(dataTest).length).toBe(3);
});

Deno.test("sum of results that can be resolved", () => {
  expect(sumOfValidCalculs(countValidCalculs(dataTest))).toBe(3749);
});

Deno.test("sum of results that can be resolved with combining", () => {
  expect(sumOfValidCalculs(countValidCalculs(dataTest, complexOperators))).toBe(
    11387,
  );
});
