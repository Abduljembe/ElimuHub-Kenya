export interface FourFigureLookupResult {
  input: string;
  tableType: 'log' | 'antilog' | 'sin' | 'cos' | 'tan' | 'reciprocal' | 'square' | 'sqrt';
  rowLabel: string;
  mainColumnLabel: string;
  mainColumnValue: number;
  meanDiffLabel?: string;
  meanDiffValue?: number;
  meanDiffOperation?: 'add' | 'subtract';
  intermediateSteps: string[];
  finalResult: string;
  knecRuleNote: string;
}

export function lookupLogarithm(num: number): FourFigureLookupResult {
  if (num <= 0) {
    return {
      input: num.toString(),
      tableType: 'log',
      rowLabel: 'N/A',
      mainColumnLabel: 'N/A',
      mainColumnValue: 0,
      intermediateSteps: ['Logarithm of zero or negative numbers is undefined in real numbers.'],
      finalResult: 'Undefined',
      knecRuleNote: 'Only positive numbers have real logarithms.'
    };
  }

  // Convert to standard form A × 10^n where 1 <= A < 10
  const exp = Math.floor(Math.log10(num));
  const mantissaRaw = num / Math.pow(10, exp);
  const mantissaStr = mantissaRaw.toFixed(4); // e.g. 5.674

  const row = mantissaStr.substring(0, 3).replace('.', ''); // first two digits e.g. "56"
  const col = mantissaStr[3]; // third digit e.g. "7"
  const diffCol = mantissaStr[4] || '0'; // fourth digit e.g. "4"

  const mainLog = Math.log10(parseFloat(mantissaStr.substring(0, 4)));
  const mantissaOnly = (mainLog - Math.floor(mainLog)).toFixed(4).substring(2); // 4 digit string

  // Approx mean diff
  const diffVal = parseInt(diffCol, 10) * 1; // table approx difference
  const finalMantissaNum = parseInt(mantissaOnly, 10) + diffVal;
  const finalMantissaStr = finalMantissaNum.toString().padStart(4, '0');

  const charStr = exp < 0 ? `bar(${Math.abs(exp)})` : exp.toString();
  const finalResult = exp < 0 ? `̄${Math.abs(exp)}.${finalMantissaStr}` : `${exp}.${finalMantissaStr}`;

  return {
    input: num.toString(),
    tableType: 'log',
    rowLabel: `Row ${row}`,
    mainColumnLabel: `Column ${col}`,
    mainColumnValue: parseInt(mantissaOnly, 10),
    meanDiffLabel: diffCol !== '0' ? `Mean Diff Column ${diffCol}` : undefined,
    meanDiffValue: diffVal,
    meanDiffOperation: 'add',
    intermediateSteps: [
      `Step 1: Express in standard scientific form: ${num} = ${mantissaStr} × 10^(${exp})`,
      `Step 2: Characteristic (integer part from power of 10) = ${charStr}`,
      `Step 3: Look up row ${row} under column ${col} in Table of Logarithms: mantissa = .${mantissaOnly}`,
      diffCol !== '0'
        ? `Step 4: Under Mean Difference column ${diffCol}, add difference (+${diffVal})`
        : 'Step 4: No mean difference column needed for 3-figure precision.',
      `Step 5: Combine characteristic and mantissa: ${finalResult}`
    ],
    finalResult,
    knecRuleNote:
      'For numbers < 1, the characteristic is negative written with a bar on top (e.g. ̄1.4321), but the mantissa is ALWAYS positive!'
  };
}

export function lookupTrigRatio(
  degrees: number,
  ratio: 'sin' | 'cos' | 'tan'
): FourFigureLookupResult {
  const normDeg = ((degrees % 360) + 360) % 360;
  const totalMinutes = Math.round(normDeg * 60);
  const degInt = Math.floor(totalMinutes / 60);
  const minInt = totalMinutes % 60;

  // Main column is in steps of 6' (0, 6, 12, 18, 24, 30, 36, 42, 48, 54)
  const mainMin = Math.floor(minInt / 6) * 6;
  const diffMin = minInt % 6;

  const radBase = ((degInt + mainMin / 60) * Math.PI) / 180;
  let baseVal = 0;
  if (ratio === 'sin') baseVal = Math.sin(radBase);
  else if (ratio === 'cos') baseVal = Math.cos(radBase);
  else baseVal = Math.tan(radBase);

  const radFull = (normDeg * Math.PI) / 180;
  let fullVal = 0;
  if (ratio === 'sin') fullVal = Math.sin(radFull);
  else if (ratio === 'cos') fullVal = Math.cos(radFull);
  else fullVal = Math.tan(radFull);

  const mainValFixed = baseVal.toFixed(4);
  const finalValFixed = fullVal.toFixed(4);
  const diffVal = Math.abs(Math.round((fullVal - baseVal) * 10000));

  return {
    input: `${degInt}° ${minInt}' (${normDeg.toFixed(2)}°)`,
    tableType: ratio,
    rowLabel: `Row ${degInt}°`,
    mainColumnLabel: `Column ${mainMin}'`,
    mainColumnValue: parseFloat(mainValFixed),
    meanDiffLabel: diffMin > 0 ? `Mean Diff ${diffMin}'` : undefined,
    meanDiffValue: diffVal,
    meanDiffOperation: ratio === 'cos' ? 'subtract' : 'add',
    intermediateSteps: [
      `Step 1: Separate angle into degrees and minutes: ${degInt}° ${minInt}'`,
      `Step 2: Nearest standard 6' column = ${mainMin}'; residual mean difference = ${diffMin}'`,
      `Step 3: Read Row ${degInt}° under ${mainMin}' column: ${mainValFixed}`,
      diffMin > 0
        ? `Step 4: Under ${diffMin}' mean difference, ${ratio === 'cos' ? 'SUBTRACT' : 'ADD'} ${diffVal}`
        : 'Step 4: Exact 6-minute column matched; no mean difference required.',
      `Step 5: Final four-figure evaluation = ${finalValFixed}`
    ],
    finalResult: finalValFixed,
    knecRuleNote:
      ratio === 'cos'
        ? 'CRITICAL KNEC EXAMINER RULE: For Natural Cosines, mean differences MUST BE SUBTRACTED because cosine decreases as angle increases between 0° and 90°!'
        : 'For Natural Sines and Tangents, mean differences are ADDED.'
  };
}
