import { readFileLineByLine } from "../helpers/parse.ts";
import {
  middlePagesSumFromInvalidUpdatesCorrected,
  middlePagesSumFromValidUpdates,
} from "./day5.ts";

const lines = await readFileLineByLine("day5/input.txt");
const [pagesRules, updates] = lines.reduce(
  (acc, line) => {
    if (line.includes("|")) {
      acc[0].push(line);
    } else if (line !== "" && line.includes(",")) {
      acc[1].push(line);
    }

    return acc;
  },
  [[], []] as [string[], string[]],
);

export default function () {
  console.log(
    `Day 5 — Part 1 : ${middlePagesSumFromValidUpdates(updates, pagesRules)}`,
  );
  console.log(
    `Day 5 — Part 2 : ${
      middlePagesSumFromInvalidUpdatesCorrected(
        updates,
        pagesRules,
      )
    }`,
  );
}
