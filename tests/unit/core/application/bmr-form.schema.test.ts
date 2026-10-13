import { bmrFormSchema } from "@/core/application/schemas/bmr-form.schema";
import { describe, expect, it } from "vitest";

describe("bmrFormSchema (Zod Validation)", () => {
  it("deve validar com sucesso um payload válido do método Mifflin-St Jeor", () => {
    const validMifflin = {
      method: "mifflin_st_jeor",
      weightKg: 75.5,
      heightCm: 175,
      ageYears: 25,
      sex: "male",
      activityLevel: "moderate",
    };

    const parseResult = bmrFormSchema.safeParse(validMifflin);
    expect(parseResult.success).toBe(true);
  });

  it("deve validar com sucesso um payload válido do método Katch-McArdle", () => {
    const validKatch = {
      method: "katch_mcardle",
      weightKg: 82.0,
      bodyFatPercentage: 12.5,
      activityLevel: "very_active",
    };

    const parseResult = bmrFormSchema.safeParse(validKatch);
    expect(parseResult.success).toBe(true);
  });

  it("deve falhar se os limites fisiológicos de peso forem violados", () => {
    const underWeight = {
      method: "mifflin_st_jeor",
      weightKg: 15,
      heightCm: 175,
      ageYears: 25,
      sex: "female",
      activityLevel: "light",
    };

    const result = bmrFormSchema.safeParse(underWeight);
    expect(result.success).toBe(false);

    if (!result.success) {
      const weightIssue = result.error.issues.find((issue) =>
        issue.path.includes("weightKg"),
      );
      expect(weightIssue?.message).toBe("weight.min");
    }
  });

  it("deve falhar se o percentual de gordura for inviável fisiologicamente (< 3% ou > 60%)", () => {
    const invalidFat = {
      method: "katch_mcardle",
      weightKg: 70,
      bodyFatPercentage: 2,
      activityLevel: "sedentary",
    };

    const result = bmrFormSchema.safeParse(invalidFat);
    expect(result.success).toBe(false);

    if (!result.success) {
      const fatIssue = result.error.issues.find((issue) =>
        issue.path.includes("bodyFatPercentage"),
      );
      expect(fatIssue?.message).toBe("bodyFat.min");
    }
  });

  it("deve exigir os campos específicos da união selecionada (ex: sex em Mifflin)", () => {
    const missingSex = {
      method: "mifflin_st_jeor",
      weightKg: 70,
      heightCm: 170,
      ageYears: 30,
      activityLevel: "sedentary",
    };

    const result = bmrFormSchema.safeParse(missingSex);
    expect(result.success).toBe(false);

    if (!result.success) {
      const sexIssue = result.error.issues.find((issue) =>
        issue.path.includes("sex"),
      );
      expect(sexIssue).toBeDefined();
    }
  });
});
