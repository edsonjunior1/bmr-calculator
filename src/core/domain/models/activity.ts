export type PhysicalActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very_active"
  | "extra_active";

export interface PhysicalActivityFactor {
  level: PhysicalActivityLevel;
  palMultiplier: number;
}

export const PAL_FACTORS: Record<PhysicalActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
} as const;
