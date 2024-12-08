import { expect } from "jsr:@std/expect/expect";
import {
  collectAntinodes,
  collecVectorsFromPointType,
  computeAntinodeFromVector,
  findCoordsInMap,
  getAllAntinodesFromMap,
  getAllPointTypeOfMap,
  recursiveCollectAntinodes,
} from "./day8.ts";

const exampleMapAntennas = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "0", ".", ".", "."],
  [".", ".", ".", ".", ".", "0", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "0", ".", ".", ".", "."],
  [".", ".", ".", ".", "0", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "A", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "A", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "A", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
];

Deno.test("get coords for points", () => {
  expect(findCoordsInMap("A", exampleMapAntennas)).toEqual([
    [6, 5],
    [8, 8],
    [9, 9],
  ]);
  expect(findCoordsInMap("0", exampleMapAntennas)).toEqual([
    [8, 1],
    [5, 2],
    [7, 3],
    [4, 4],
  ]);
});

Deno.test("construct vectors from points", () => {
  expect(collecVectorsFromPointType("A", exampleMapAntennas).size).toEqual(3);
  expect(collecVectorsFromPointType("0", exampleMapAntennas).size).toEqual(6);
});

Deno.test("compute antinodes from vector", () => {
  expect(computeAntinodeFromVector("6,5→8,8")).toEqual([
    [4, 2],
    [10, 11],
  ]);
  expect(computeAntinodeFromVector("8,1→5,2")).toEqual([
    [11, 0],
    [2, 3],
  ]);
});

Deno.test("collect all antinodes from point", () => {
  expect(collectAntinodes("A", exampleMapAntennas)).toEqual(
    new Set(["10,10", "10,11", "3,1", "4,2", "7,7"]),
  );
});

Deno.test("get all point type from a map", () => {
  expect(getAllPointTypeOfMap(exampleMapAntennas)).toEqual(["0", "A"]);
});

Deno.test("get all antinodes from a map", () => {
  const antinodes = getAllAntinodesFromMap(exampleMapAntennas);

  expect(antinodes.size).toEqual(14);
});

Deno.test("get recursive antinodes", () => {
  expect(recursiveCollectAntinodes("0", exampleMapAntennas)).toEqual(
    new Set([
      "0,7",
      "1,0",
      "1,10",
      "1,5",
      "10,2",
      "11,0",
      "11,5",
      "2,3",
      "2,8",
      "3,1",
      "3,11",
      "3,6",
      "4,4",
      "4,9",
      "5,2",
      "5,7",
      "6,0",
      "6,5",
      "7,3",
      "8,1",
      "9,4",
    ]),
  );
});

Deno.test("get all antinodes from a map, recursively", () => {
  const antinodes = getAllAntinodesFromMap(exampleMapAntennas, true);
  expect(antinodes.size).toEqual(34);
});
