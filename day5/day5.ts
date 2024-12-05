export function updateIsValid(update: string, rules: string[]) {
  const rulesSet = new Set(rules);
  const pagesArray = update.split(",");

  return pagesArray.toSpliced(pagesArray.length - 1, 1).every((page, index) => {
    return rulesSet.has(`${page}|${pagesArray[index + 1]}`);
  });
}

export function findValidUpdates(updates: string[], rules: string[]) {
  return updates.filter((update) => updateIsValid(update, rules));
}

export function findInValidUpdates(updates: string[], rules: string[]) {
  return updates.filter((update) => !updateIsValid(update, rules));
}

export function findMiddlePage(update: string[]) {
  return update[Math.floor(update.length / 2)];
}

export function middlePagesSumFromValidUpdates(
  updates: string[],
  rules: string[],
) {
  return findValidUpdates(updates, rules).reduce((acc, update) => {
    return acc + Number(findMiddlePage(update.split(",")));
  }, 0);
}

export function middlePagesSumFromInvalidUpdatesCorrected(
  updates: string[],
  rules: string[],
) {
  return findInValidUpdates(updates, rules).reduce((acc, update) => {
    return acc + Number(findMiddlePage(correctInvalidUpdate(update, rules)));
  }, 0);
}

export function correctInvalidUpdate(
  update: string | string[],
  rules: string[] | Set<string>,
) {
  const rulesSet = rules instanceof Set ? rules : new Set(rules);
  const pagesArray = Array.isArray(update) ? update : update.split(",");

  const errorIndexInUpdate = pagesArray
    .toSpliced(pagesArray.length - 1, 1)
    .findIndex(
      (page, index) => !rulesSet.has(`${page}|${pagesArray[index + 1]}`),
    );

  if (errorIndexInUpdate >= 0) {
    pagesArray.splice(
      errorIndexInUpdate,
      2,
      ...pagesArray.slice(errorIndexInUpdate, errorIndexInUpdate + 2).reverse(),
    );
    return correctInvalidUpdate(pagesArray, rulesSet);
  } else {
    return pagesArray;
  }
}
