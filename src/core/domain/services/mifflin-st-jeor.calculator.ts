import { MifflinParameters } from "../models/calculation";

export function calculateMifflinStJeor(params: MifflinParameters): number {
  const { weightKg, heightCm, ageYears, sex } = params;
  const baseMetabolism = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  const sexCorrection = sex === "male" ? 5 : -161;
  return baseMetabolism + sexCorrection;
}
