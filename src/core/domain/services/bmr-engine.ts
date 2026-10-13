import { PAL_FACTORS } from "../models/activity";
import {
  BmrCalculationInput,
  BmrCalculationOutput,
  ConfidenceInterval,
} from "../models/calculation";
import { calculateKatchMcArdle } from "./katch-mcardle.calculator";
import { calculateMifflinStJeor } from "./mifflin-st-jeor.calculator";

const ERROR_MARGIN_FACTOR = 0.1;

function computeInterval(value: number): ConfidenceInterval {
  return {
    lowerBound: Math.round(value * (1 - ERROR_MARGIN_FACTOR)),
    upperBound: Math.round(value * (1 + ERROR_MARGIN_FACTOR)),
  };
}

export function computeEnergyMetrics(
  input: BmrCalculationInput,
): BmrCalculationOutput {
  let rawBmr: number;
  let leanMassKg: number | undefined;

  if (input.method === "katch_mcardle") {
    const result = calculateKatchMcArdle(input);
    rawBmr = result.bmr;
    leanMassKg = Number(result.leanMassKg.toFixed(1));
  } else {
    rawBmr = calculateMifflinStJeor(input);
  }

  const bmr = Math.round(rawBmr);
  const pal = PAL_FACTORS[input.activityLevel];
  const tdee = Math.round(bmr * pal);

  return {
    bmr,
    tdee,
    bmrConfidenceInterval: computeInterval(bmr),
    tdeeConfidenceInterval: computeInterval(tdee),
    leanMassKg,
    method: input.method,
  };
}
