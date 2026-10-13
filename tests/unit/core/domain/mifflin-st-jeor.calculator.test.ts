import { MifflinParameters } from "@/core/domain/models/calculation";
import { calculateMifflinStJeor } from "@/core/domain/services/mifflin-st-jeor.calculator";
import { describe, expect, it } from "vitest";

describe("calculateMifflinStJeor", () => {
  it("deve calcular a TMB masculina corretamente conforme a fórmula analítica", () => {
    const params: MifflinParameters = {
      method: "mifflin_st_jeor",
      weightKg: 80,
      heightCm: 180,
      ageYears: 30,
      sex: "male",
      activityLevel: "sedentary",
    };

    const bmr = calculateMifflinStJeor(params);
    expect(bmr).toBe(1780);
  });

  it("deve calcular a TMB feminina aplicando o offset de -161 kcal", () => {
    const params: MifflinParameters = {
      method: "mifflin_st_jeor",
      weightKg: 60,
      heightCm: 165,
      ageYears: 28,
      sex: "female",
      activityLevel: "sedentary",
    };

    const bmr = calculateMifflinStJeor(params);
    expect(bmr).toBeCloseTo(1330.25, 2);
  });
});
