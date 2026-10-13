import { KatchMcArdleParameters } from "../models/calculation";

export interface KatchMcArdleCalculationResult {
  bmr: number;
  leanMassKg: number;
}

export function calculateKatchMcArdle(
  params: KatchMcArdleParameters,
): KatchMcArdleCalculationResult {
  const { weightKg, bodyFatPercentage } = params;
  const leanMassKg = weightKg * (1 - bodyFatPercentage / 100);
  const bmr = 370 + 21.6 * leanMassKg;

  return {
    bmr,
    leanMassKg,
  };
}
