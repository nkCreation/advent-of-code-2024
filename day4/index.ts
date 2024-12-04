import { readFileLineByLine } from "../helpers/parse.ts";
import {
  findIntersectingVectors,
  searchWordsInMatrix,
  xDirections,
} from "./day4.ts";

const lines = await readFileLineByLine("day4/input.txt");

export default function () {
  console.log(`Day 4 — Part 1 : ${searchWordsInMatrix(lines, "XMAS").size}`);
  console.log(
    `Day 4 — Part 2 : ${
      findIntersectingVectors(
        Array.from(searchWordsInMatrix(lines, "MAS", xDirections)),
      ).length
    }`,
  );
}
