export type Operator = "+" | "*" | "||";
export type Calcul = [string, string[]];

export function countValidCalculs(calculs: Calcul[], operators?: Operator[]) {
  return calculs.filter(([result, numbers]) =>
    calculsThatCanBeResolved(result, numbers, operators)
  );
}

export function sumOfValidCalculs(calculs: Calcul[]) {
  return calculs.reduce((acc, [result, _]) => {
    acc += parseInt(result);

    return acc;
  }, 0);
}

export function calculsThatCanBeResolved(
  result: string,
  numbers: string[],
  operators: Operator[] = ["*", "+"],
): boolean {
  return combineOperators(numbers.length - 1, operators).some((combination) => {
    const operatorCombination = combination.split(",");

    const calculResult = numbers.reduce((acc, number, index) => {
      if (acc === 0) {
        acc = parseInt(number);
      } else {
        if (operatorCombination[index - 1] === "+") {
          acc += parseInt(number);
        } else if (operatorCombination[index - 1] === "*") {
          acc *= parseInt(number);
        } else if (operatorCombination[index - 1] === "||") {
          acc = parseInt(`${acc}${number}`);
        }
      }

      return acc;
    }, 0);

    return parseInt(result) === calculResult;
  });
}

export function combineOperators(length: number, operators: Operator[]) {
  const possiblesArrays: Operator[][] = [];

  for (let i = 0; i < length; i++) {
    possiblesArrays.push(operators);
  }

  return combine(possiblesArrays);
}

function combine<T extends string>([head, ...[headTail, ...tailTail]]: Array<
  Array<T>
>) {
  if (!headTail) return head;

  const combined = headTail.reduce((acc, x) => {
    return acc.concat(head.map((h) => `${h},${x}`));
  }, [] as string[]);

  return combine([combined, ...tailTail]);
}
