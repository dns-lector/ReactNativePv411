// enum in TS deprecated
const CalcButtonTypes = {
  digit: "digit",
  operation: "operation",
  equal: "equal",  
} as const;

type CalcButtonTypes = typeof CalcButtonTypes[keyof typeof CalcButtonTypes]

export { CalcButtonTypes };