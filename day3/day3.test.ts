import { expect } from "jsr:@std/expect/expect";
import {
  computeMulInstructions,
  evalMulInstruction,
  executeMulInstructions,
  filterInstructions,
  findMulInstructions,
  MUL_REGEX_DOS,
} from "./day3.ts";
import { executeMulInstructionsWithDos } from "./day3.ts";

const testString =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const testWithDos =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

Deno.test("find multiply instruction in text", () => {
  expect(findMulInstructions(testString)).toHaveLength(4);
});

Deno.test('find multiply instruction with "do" and "don\'t" in text', () => {
  expect(findMulInstructions(testWithDos, MUL_REGEX_DOS)).toHaveLength(6);
});

Deno.test(
  'find multiply instruction with "do" and "don\'t" in text and filter them',
  () => {
    expect(
      filterInstructions(findMulInstructions(testWithDos, MUL_REGEX_DOS)),
    ).toHaveLength(2);
  },
);
Deno.test("multiply mul instructions", () => {
  expect(computeMulInstructions(["mul(2,4)", "mul(5,5)"])).toBe(33);
});

Deno.test("find numbers to multiply into instruction", () => {
  expect(evalMulInstruction("mul(2,4)")).toEqual([2, 4]);
});

Deno.test("test program", () => {
  expect(executeMulInstructions(testString)).toBe(161);
});

Deno.test("test program with dos", () => {
  expect(executeMulInstructionsWithDos(testWithDos)).toBe(48);
});
