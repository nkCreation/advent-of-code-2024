import { readFileLineByLine } from "../helpers/parse.ts";
import { Calcul, countValidCalculs, sumOfValidCalculs } from "./day7.ts";

const lines = await readFileLineByLine("day7/input.txt");
const calculs: Calcul[] = lines.map((line) => {
  const numbers = line.split(" ");
  return [numbers[0].replace(":", ""), [...numbers.slice(1)]];
});

export default function () {
  console.log(
    `Day 7 — Part 1 : ${sumOfValidCalculs(countValidCalculs(calculs))}`,
  );
  console.log(
    `Day 7 — Part 2 : ${
      sumOfValidCalculs(
        countValidCalculs(calculs, ["*", "+", "||"]),
      )
    }`,
  );
}
