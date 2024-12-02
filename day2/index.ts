import { readFileLineByLine } from "../helpers/parse.ts";
import { isSafeReportsWithTolerance, isStrictlySafeReports } from "./day2.ts";

const lines = await readFileLineByLine("day2/input.txt");

const reports = lines.map((line) => {
  return line.split(" ").map((n) => parseInt(n));
});

export default function () {
  console.log(isStrictlySafeReports(reports));
  console.log(isSafeReportsWithTolerance(reports));
}
