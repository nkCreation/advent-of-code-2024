import { readFileLineByLine } from "../helpers/parse.ts";
import { diskMapToCheksumByBlock, diskMapToCheksumByFile } from "./day9.ts";

const lines = await readFileLineByLine("day9/input.txt");

export default function () {
  console.log(`Day 9 — Part 1 : ${diskMapToCheksumByBlock(lines[0])}`);
  console.log(`Day 9 — Part 2 : ${diskMapToCheksumByFile(lines[0])}`);
}
