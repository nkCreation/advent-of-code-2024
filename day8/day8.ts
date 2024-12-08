import { Coord, isOutOfMap } from "../day6/day6.ts";
import { Map } from "../day6/day6.ts";

// y the lines, x the columns [x,y], [0,0] at the top left

export type Vector = `${number},${number}→${number},${number}`;

export function getAllPointTypeOfMap(map: Map): string[] {
  return Array.from(
    map.flat(1).reduce((acc, point) => {
      if (point !== ".") {
        acc.add(point);
      }

      return acc;
    }, new Set<string>()),
  );
}

export function getAllAntinodesFromMap(
  map: Map,
  recursive: boolean = false,
): Set<string> {
  return getAllPointTypeOfMap(map).reduce((acc, pointType) => {
    acc = acc.union(
      recursive
        ? recursiveCollectAntinodes(pointType, map)
        : collectAntinodes(pointType, map),
    );

    return acc;
  }, new Set<string>());
}

export function collecVectorsFromPointType(
  pointType: string,
  map: Map,
): Set<Vector> {
  const coords = findCoordsInMap(pointType, map).reduce(
    (set, coord, _, coords) => {
      coords.forEach((otherCoord) => {
        if (coord !== otherCoord) {
          set.add(constructVector(coord, otherCoord));
        }
      });

      return set;
    },
    new Set<Vector>(),
  );

  return coords;
}

export function collectAntinodes(pointType: string, map: Map): Set<string> {
  const vectors = collecVectorsFromPointType(pointType, map);

  return Array.from(vectors).reduce((acc, val) => {
    computeAntinodeFromVector(val)
      .filter((coord) => !isOutOfMap(coord, map))
      .forEach((antinodeCoord) => acc.add(antinodeCoord.join(",")));

    return acc;
  }, new Set<string>());
}

export function recursiveCollectAntinodes(
  pointType: string,
  map: Map,
): Set<string> {
  const vectors = collecVectorsFromPointType(pointType, map);

  return Array.from(vectors).reduce((acc, val) => {
    recursiveComputeAntinodeFromVector(val, map)
      .filter((coord) => !isOutOfMap(coord, map))
      .forEach((antinodeCoord) => acc.add(antinodeCoord.join(",")));

    return acc;
  }, new Set<string>());
}

export function recursiveComputeAntinodeFromVector(
  vector: Vector,
  map: Map,
): Coord[] {
  const [A, B] = vector.split("→").map((coord) => coord.split(",").map(Number));
  const xDistance = A[0] - B[0];
  const yDistance = A[1] - B[1];

  let tmpCoords = [[...A] as Coord, [...B] as Coord];
  const antinodes: Coord[] = [...tmpCoords];
  let isAllOut = false;

  while (!isAllOut) {
    tmpCoords = getAntinodeFromCoords(
      [[...tmpCoords[0]] as Coord, [...tmpCoords[1]] as Coord],
      [xDistance, yDistance],
    );

    antinodes.push(...tmpCoords);

    isAllOut = tmpCoords.every((coord) => isOutOfMap(coord, map));
  }

  return antinodes;
}

export function getAntinodeFromCoords(
  [A, B]: [Coord, Coord],
  [X, Y]: Coord,
): Coord[] {
  const antinodes: Coord[] = [
    [A[0] += X, A[1] += Y] as Coord,
    [B[0] -= X, B[1] -= Y] as Coord,
  ];

  return antinodes;
}

export function computeAntinodeFromVector(vector: Vector): Coord[] {
  const [A, B] = vector.split("→").map((coord) => coord.split(",").map(Number));
  const xDistance = A[0] - B[0];
  const yDistance = A[1] - B[1];

  return getAntinodeFromCoords(
    [A as Coord, B as Coord],
    [xDistance, yDistance],
  );
}

export function constructVector(A: Coord, B: Coord): Vector {
  const sortedCoords = [A, B].toSorted((a, b) => a[1] - b[1]);
  return `${sortedCoords.map((coord) => coord.join(",")).join("→") as Vector}`;
}

export function findCoordsInMap(pointType: string, map: Map): Coord[] {
  const lineLength = map[0].length;
  return map.flat(1).reduce((acc, point, index) => {
    if (point === pointType) {
      acc.push([index % lineLength, Math.floor(index / lineLength)]);
    }
    return acc;
  }, [] as Coord[]);
}
