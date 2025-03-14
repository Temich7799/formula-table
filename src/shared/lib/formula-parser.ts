export function evaluateFormula(formula: string): number | string {
  try {
    // Simple mock implementation that evaluates basic arithmetic expressions
    if (!formula.trim()) {
      return 0;
    }

    const sanitizedFormula = formula.replace(/[^0-9+\-*/.()\s]/g, '');

    if (!sanitizedFormula) {
      return 'Invalid formula';
    }

    const result = eval(sanitizedFormula);
    return isNaN(result) ? 'Invalid formula' : result;
  } catch (error) {
    return 'Invalid formula';
  }
}
