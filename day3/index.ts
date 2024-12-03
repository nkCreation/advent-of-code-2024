import { readFileLineByLine } from "../helpers/parse.ts";
import {
  executeMulInstructions,
  executeMulInstructionsWithDos,
} from "./day3.ts";

const lines = await readFileLineByLine("day3/input.txt");
const program = lines.join("");

export default function () {
  console.log(`Day 3 — Part 1 : ${executeMulInstructions(program)}`);
  console.log(`Day 3 — Part 2 : ${executeMulInstructionsWithDos(program)}`);
}
