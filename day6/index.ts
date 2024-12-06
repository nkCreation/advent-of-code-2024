import { readFileLineByLine } from "../helpers/parse.ts";
import { findObstructions, launchPatrol } from "./day6.ts";

const lines = await readFileLineByLine("day6/input.txt");
const map = lines.map((line) => line.split(""));
const secondMap = JSON.parse(JSON.stringify(map));

export default function () {
  console.log(`Day 6 — Part 1 : ${launchPatrol(map)}`);
  // sory for the brute force, but I'm tired
  console.log(`Day 6 — Part 1 : ${findObstructions(secondMap)}`);
}
