export type MatrixItem = {
  coord: string;
  value: string;
};

export const possibleDirections: Record<string, [number, number]> = {
  tl: [-1, -1],
  t: [-1, 0],
  tr: [-1, 1],
  l: [0, -1],
  r: [0, 1],
  bl: [1, -1],
  b: [1, 0],
  br: [1, 1],
};

export const xDirections: Record<string, [number, number]> = {
  tl: [-1, -1],
  tr: [-1, 1],
  bl: [1, -1],
  br: [1, 1],
};

export function searchWordsInMatrix(
  matrix: string[],
  word: string,
  directions: Record<string, [number, number]> = possibleDirections,
): Set<string> {
  const wordToArray = word.split("");
  const results = matrix.reduce((results, row, rowIndex) => {
    const chars = row.split("");

    chars.forEach((char, charIndex) => {
      if (char === wordToArray[0]) {
        const correctSiblings = Array.from(
          getPossibleSiblings(rowIndex, charIndex, matrix, directions),
        ).filter(([_, value]) => value === wordToArray[1]);

        correctSiblings.forEach(([direction, _]) => {
          const nextChars = wordToArray.slice(2).reduce((acc, _, index) => {
            const [x, y] = directions[direction as keyof typeof directions];
            const charDistance = index + 2;

            const item: MatrixItem = {
              coord: `${rowIndex + x * charDistance},${
                charIndex + y * charDistance
              }`,
              value: matrix[rowIndex + x * charDistance]?.[
                charIndex + y * charDistance
              ],
            };

            acc.push(item);

            return acc;
          }, [] as MatrixItem[]);

          if (
            wordToArray.join("") ===
              [
                wordToArray[0],
                wordToArray[1],
                ...nextChars.map((item) => item.value),
              ].join("")
          ) {
            results.add(
              `${rowIndex},${charIndex}|${
                nextChars[nextChars.length - 1].coord
              }`,
            );
          }
        });
      }
    });

    return results;
  }, new Set<string>());

  return results;
}

export function getPossibleSiblings(
  rowIndex: number,
  charIndex: number,
  matrix: string[],
  directions: Record<string, [number, number]>,
) {
  const siblings = new Map();

  Object.entries(directions).forEach(([direction, [y, x]]) => {
    if (
      rowIndex + y >= 0 &&
      rowIndex + y < matrix.length &&
      charIndex + x >= 0 &&
      charIndex + x < matrix[0].length
    ) {
      siblings.set(direction, matrix[rowIndex + y][charIndex + x]);
    }
  });

  return siblings;
}

export function findIntersectingVectors(vectors: string[]) {
  const vectorsWithMiddle = vectors.reduce((acc, vector) => {
    const [A, B] = vector.split("|");
    const [Ax, Ay] = A.split(",").map((x) => parseInt(x));
    const [Bx, By] = B.split(",").map((x) => parseInt(x));

    const middlePoint = `${(By + Ay) / 2},${(Bx + Ax) / 2}`;

    if (acc.has(middlePoint)) {
      acc.get(middlePoint)!.push(vector);
    } else {
      acc.set(middlePoint, [vector]);
    }

    return acc;
  }, new Map<string, string[]>());

  const intersectingVectors = Array.from(vectorsWithMiddle.values()).filter(
    (v) => v.length > 1,
  );
  return intersectingVectors;
}
