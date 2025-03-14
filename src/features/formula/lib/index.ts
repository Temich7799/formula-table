const mathOperatorRegex = /[+\-*/^]/;

export const parseFormulaToTokens = (formula: string): string[] => {
  if (!formula) return [];

  const result: string[] = [];
  let currentToken = '';

  for (let i = 0; i < formula.length; i++) {
    if (mathOperatorRegex.test(formula[i])) {
      if (currentToken) {
        result.push(currentToken);
        currentToken = '';
      }
      result.push(formula[i]);
    } else {
      currentToken += formula[i];
    }
  }

  if (currentToken) {
    result.push(currentToken);
  }

  return result.filter((t) => t.trim() !== '');
};
