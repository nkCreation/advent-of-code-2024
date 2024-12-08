import { Map } from "../day6/day6.ts";
import { readFileLineByLine } from "../helpers/parse.ts";
import { getAllAntinodesFromMap } from "./day8.ts";

const lines = await readFileLineByLine("day8/input.txt");
const map: Map = lines.map((line) => line.split(""));

export default function () {
  console.log(`Day 8 — Part 1 : ${getAllAntinodesFromMap(map).size}`);
  console.log(`Day 8 — Part 2 : ${getAllAntinodesFromMap(map, true).size}`);
}
