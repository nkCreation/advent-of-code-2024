import { calculateSimilarity, findTotalDistance } from "./day1/index.ts";
import { readFileLineByLine } from "./helpers/parse.ts";

const lines = await readFileLineByLine("day1/input.txt");

const [list1, list2] = lines.reduce(
  (acc, line) => {
    const numbers = line.split("   ");
    acc[0].push(parseInt(numbers[0]));
    acc[1].push(parseInt(numbers[1]));

    return acc;
  },
  [[], []] as [number[], number[]]
);

console.log(findTotalDistance(list1, list2));
console.log(calculateSimilarity(list1, list2));
