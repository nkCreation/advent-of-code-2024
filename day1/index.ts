export function findTotalDistance(list1: number[], list2: number[]): number {
  list1.sort();
  list2.sort();

  return list1.reduce((acc, number, index) => {
    const distance = calculateDistance(number, list2[index]);
    acc += distance;
    return acc;
  }, 0);
}

export function calculateDistance(a: number, b: number): number {
  return Math.abs(a - b);
}

export function countOccurrences(number: number, list: number[]): number {
  return list.filter((n) => n === number).length;
}

export function countSimilarity(number: number, list: number[]): number {
  return countOccurrences(number, list) * number;
}

export function calculateSimilarity(list1: number[], list2: number[]): number {
  return list1.reduce(
    (acc, number) => {
      if (acc[1].has(number)) {
        acc[0] += number * acc[1].get(number)!;
      } else {
        const numberOfTimes = countOccurrences(number, list2);

        acc[0] += number * numberOfTimes;
        acc[1].set(number, numberOfTimes);
      }

      return acc;
    },
    [0, new Map<number, number>()] as [number, Map<number, number>]
  )[0];
}
