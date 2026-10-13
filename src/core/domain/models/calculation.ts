import { PhysicalActivityLevel } from "./activity";

export type Sex = "male" | "female";
export type CalculationMethod = "mifflin_st_jeor" | "katch_mcardle";

export interface ConfidenceInterval {
  lowerBound: number;
  upperBound: number;
}

export interface BmrCalculationOutput {
  bmr: number;
  tdee: number;
  bmrConfidenceInterval: ConfidenceInterval;
  tdeeConfidenceInterval: ConfidenceInterval;
  leanMassKg?: number;
  method: CalculationMethod;
}

export interface MifflinParameters {
  method: "mifflin_st_jeor";
  weightKg: number;
  heightCm: number;
  ageYears: number;
  sex: Sex;
  activityLevel: PhysicalActivityLevel;
}

export interface KatchMcArdleParameters {
  method: "katch_mcardle";
  weightKg: number;
  bodyFatPercentage: number;
  activityLevel: PhysicalActivityLevel;
}

export type BmrCalculationInput = MifflinParameters | KatchMcArdleParameters;
