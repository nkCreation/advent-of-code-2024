// y the lines, x the columns

export const directions = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
};

export type Direction = keyof typeof directions;
export type Coord = [number, number];
export type Map = string[][];

export function getPointValueInMap(pointCoords: Coord, map: Map) {
  if (isOutOfMap(pointCoords, map)) {
    return "#";
  }

  return map[pointCoords[1]][pointCoords[0]];
}

export function isOutOfMap(coord: Coord, map: Map): boolean {
  if (
    coord[0] < 0 ||
    coord[1] < 0 ||
    coord[1] >= map.length ||
    coord[0] >= map[0].length
  ) {
    return true;
  }

  return false;
}

export function nextCoordForDirection(
  point: Coord,
  direction: Direction
): Coord {
  return [
    point[0] + directions[direction][0],
    point[1] + directions[direction][1],
  ];
}

export function moveUntilHit(
  direction: Direction,
  startCoord: Coord,
  map: Map
) {
  let coord = startCoord;
  const coordValue = getPointValueInMap(coord, map);

  while (
    getPointValueInMap(nextCoordForDirection(coord, direction), map) !== "#"
  ) {
    map[coord[1]][coord[0]] = "X";
    coord = nextCoordForDirection(coord, direction);
    map[coord[1]][coord[0]] = coordValue;
  }

  return coord;
}

export function isCoordOnTheEdge(coord: Coord, map: Map) {
  return (
    coord[0] === 0 ||
    coord[1] === 0 ||
    coord[0] === map[0].length - 1 ||
    coord[1] === map.length - 1
  );
}

export function turnRight(direction: Direction): Direction {
  switch (direction) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
  }
}

export function findGuardCoordInMap(guardValue: string, map: Map): Coord {
  const lineLength = map[0].length;
  const guardIndex = map.flat(1).findIndex((v) => v === guardValue);

  return [guardIndex % lineLength, Math.floor(guardIndex / lineLength)];
}

export function moveGuardUponMap(guardValue: string, map: Map) {
  const initialCoordOfGuard = findGuardCoordInMap(guardValue, map);

  let coord = initialCoordOfGuard;
  let isOut = false;
  let direction: Direction = "up";
  let isInfinite = false;
  const hittedObstacle = new Set<string>();

  while (!isOut) {
    coord = moveUntilHit(direction, coord, map);
    const obstacleCoord = nextCoordForDirection(coord, direction);

    if (hittedObstacle.has(obstacleCoord.join(",") + direction)) {
      isInfinite = true;
      isOut = true;

      break;
    } else {
      hittedObstacle.add(obstacleCoord.join(",") + direction);

      direction = turnRight(direction);
      isOut = isCoordOnTheEdge(coord, map);
    }
  }

  map[coord[1]][coord[0]] = "X";
  return isInfinite;
}

export function countValuesInMap(value: string, map: Map) {
  return map.flat(1).filter((v) => v === value).length;
}

export function launchPatrol(map: Map) {
  const isInfinite = moveGuardUponMap("^", map);

  if (!isInfinite) {
    return countValuesInMap("X", map);
  }
}

export function reconstructMap(map: Map[0], length: number) {
  const reconstrutedMap: Map = [];

  for (let index = 0; index < map.length / length; index++) {
    reconstrutedMap.push(map.slice(index * length, (index + 1) * length));
  }

  return reconstrutedMap;
}

export function findObstructions(map: Map) {
  const lineLength = map[0].length;

  return map.flat(1).reduce((acc, val, index) => {
    if (val !== "^") {
      const result = launchPatrol(
        reconstructMap(map.flat(1).toSpliced(index, 1, "#"), lineLength)
      );

      if (!result) {
        acc++;
      }
    }

    return acc;
  }, 0);
}
