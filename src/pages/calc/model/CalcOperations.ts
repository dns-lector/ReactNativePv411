const CalcOperations = {
  add: "\uFF0B",
  sub: "\u2212",
  div: "\u00F7",  
  mul: "\u00D7",  
} as const;

type CalcOperations = typeof CalcOperations[keyof typeof CalcOperations]

export { CalcOperations };