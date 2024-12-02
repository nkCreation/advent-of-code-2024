export function isIncreasing(array: number[]): number[] | undefined {
  const test = [...array];
  test.sort((a, b) => a - b);

  return test.join("") === array.join("") ? array : undefined;
}

export function isDecreasing(array: number[]): number[] | undefined {
  const test = [...array];
  test.sort((a, b) => a - b).reverse();

  return test.join("") === array.join("") ? array : undefined;
}

export function isAllUnique(array: number[]): boolean {
  return new Set(array).size === array.length;
}

export function isBetweenStep(array: number[], step: number): boolean {
  return array.every(
    (value, index, baseArray) =>
      Math.abs(value - baseArray[Math.max(index - 1, 0)]) <= step
  );
}

export function isLinear(val: number[]): boolean {
  return !!isIncreasing(val) || !!isDecreasing(val);
}

export function isSafe(val: number[]) {
  return isLinear(val) && isAllUnique(val) && isBetweenStep(val, 3);
}

export function isStrictlySafeReports(reports: Array<number[]>): number {
  return reports.reduce((acc, val) => {
    if (isSafe(val)) {
      acc++;
    }

    return acc;
  }, 0);
}

export function isSafeReportsWithTolerance(reports: Array<number[]>): number {
  return reports.reduce((acc, val) => {
    if (isSafe(val)) {
      acc++;

      return acc;
    }

    const bruteForceTest = val.reduce((acc, _, index) => {
      const newArray = [...val];
      newArray.splice(index, 1);
      acc.push(newArray);

      return acc;
    }, [] as number[][]);

    if (bruteForceTest.some(isSafe)) {
      acc++;
    }

    return acc;
  }, 0);
}
