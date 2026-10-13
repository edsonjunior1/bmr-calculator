import { KatchMcArdleParameters } from "@/core/domain/models/calculation";
import { calculateKatchMcArdle } from "@/core/domain/services/katch-mcardle.calculator";
import { describe, expect, it } from "vitest";

describe("calculateKatchMcArdle", () => {
  it("deve calcular a massa magra e a TMB baseada em 370 + (21.6 * FFM)", () => {
    const params: KatchMcArdleParameters = {
      method: "katch_mcardle",
      weightKg: 80,
      bodyFatPercentage: 15,
      activityLevel: "moderate",
    };

    const result = calculateKatchMcArdle(params);

    expect(result.leanMassKg).toBe(68);
    expect(result.bmr).toBeCloseTo(1838.8, 1);
  });
});
