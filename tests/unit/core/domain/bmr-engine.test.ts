import { computeEnergyMetrics } from "@/core/domain/services/bmr-engine";
import { describe, expect, it } from "vitest";

describe("computeEnergyMetrics Engine", () => {
  it("deve orquestrar o cálculo Mifflin, multiplicar pelo fator PAL e gerar bandas de confiança de 10%", () => {
    const result = computeEnergyMetrics({
      method: "mifflin_st_jeor",
      weightKg: 80,
      heightCm: 180,
      ageYears: 30,
      sex: "male",
      activityLevel: "moderate",
    });

    expect(result.bmr).toBe(1780);
    expect(result.tdee).toBe(2759);
    expect(result.bmrConfidenceInterval.lowerBound).toBe(1602);
    expect(result.bmrConfidenceInterval.upperBound).toBe(1958);
    expect(result.tdeeConfidenceInterval.lowerBound).toBe(2483);
    expect(result.tdeeConfidenceInterval.upperBound).toBe(3035);
  });

  it("deve orquestrar Katch-McArdle e expor a massa magra arredondada", () => {
    const result = computeEnergyMetrics({
      method: "katch_mcardle",
      weightKg: 80,
      bodyFatPercentage: 15,
      activityLevel: "sedentary",
    });

    expect(result.bmr).toBe(1839);
    expect(result.tdee).toBe(2207);
    expect(result.leanMassKg).toBe(68);
    expect(result.method).toBe("katch_mcardle");
  });
});
