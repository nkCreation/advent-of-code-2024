import { expect } from "jsr:@std/expect/expect";
import {
  countValuesInMap,
  findGuardCoordInMap,
  findObstructions,
  getPointValueInMap,
  isCoordOnTheEdge,
  launchPatrol,
  moveGuardUponMap,
  moveUntilHit,
  nextCoordForDirection,
  reconstructMap,
} from "./day6.ts";

Deno.test("can move up", () => {
  expect(nextCoordForDirection([4, 7], "up")).toEqual([4, 6]);
});

Deno.test("can move right", () => {
  expect(nextCoordForDirection([4, 7], "right")).toEqual([5, 7]);
});

Deno.test("can move left", () => {
  expect(nextCoordForDirection([4, 7], "left")).toEqual([3, 7]);
});

Deno.test("can move down", () => {
  expect(nextCoordForDirection([4, 7], "down")).toEqual([4, 8]);
});

Deno.test("find point in map", () => {
  expect(
    getPointValueInMap(
      [2, 3],
      [
        "..........".split(""),
        "..........".split(""),
        "..........".split(""),
        "..X.......".split(""),
      ]
    )
  ).toBe("X");
});

Deno.test("point is on the edge of map", () => {
  const map = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];

  expect(isCoordOnTheEdge([1, 0], map)).toBe(true);
  expect(isCoordOnTheEdge([2, 1], map)).toBe(true);
  expect(isCoordOnTheEdge([1, 2], map)).toBe(true);
  expect(isCoordOnTheEdge([0, 1], map)).toBe(true);
  expect(isCoordOnTheEdge([1, 1], map)).toBe(false);
});

Deno.test("find coord of point in map", () => {
  const exampleMap = [
    [".", ".", "."],
    [".", "#", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", "^", "."],
    [".", ".", "."],
  ];

  expect(findGuardCoordInMap("^", exampleMap)).toEqual([1, 4]);
});

Deno.test("move guard until hit", () => {
  const exampleMap = [
    [".", ".", "."],
    [".", "#", "."],
    [".", ".", "."],
    [".", ".", "."],
    [".", "^", "."],
    [".", ".", "."],
  ];

  const resultMap = [
    [".", ".", "."],
    [".", "#", "."],
    [".", "^", "."],
    [".", "X", "."],
    [".", "X", "."],
    [".", ".", "."],
  ];

  moveUntilHit("up", [1, 4], exampleMap);
  expect(exampleMap).toEqual(resultMap);
});

Deno.test("move guard upon map until out", () => {
  const exampleMap = [
    [".", ".", ".", ".", "."],
    [".", "#", ".", ".", "."],
    [".", ".", ".", ".", "#"],
    [".", ".", ".", ".", "."],
    [".", "^", ".", "#", "."],
    [".", ".", ".", ".", "."],
  ];

  const resultMap = [
    [".", ".", ".", ".", "."],
    [".", "#", ".", ".", "."],
    [".", "X", "X", "X", "#"],
    ["X", "X", "X", "X", "."],
    [".", "X", ".", "#", "."],
    [".", ".", ".", ".", "."],
  ];
  moveGuardUponMap("^", exampleMap);

  expect(exampleMap).toEqual(resultMap);
});

Deno.test("count positions covered by the guard in the map", () => {
  const exampleExerciseMap = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ];

  expect(countValuesInMap("X", exampleExerciseMap)).toBe(0);
  expect(launchPatrol(exampleExerciseMap)).toBe(41);
});

Deno.test("reconstruct map from flat array", () => {
  const exampleExerciseMap = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ];

  expect(
    reconstructMap(exampleExerciseMap.flat(1), exampleExerciseMap[0].length)
  ).toEqual(exampleExerciseMap);
});

Deno.test("signal when guard is in infinite loop", () => {
  const exampleExerciseMap = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", "#", ".", "."],
  ];

  expect(launchPatrol(exampleExerciseMap)).toBeUndefined();
});

Deno.test("find obstructions and infinite guard moving", () => {
  const exampleExerciseMap = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ];

  expect(findObstructions(exampleExerciseMap)).toBe(6);
});
