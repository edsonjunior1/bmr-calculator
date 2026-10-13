import {
  computeCaloricTarget,
  computeNutritionPlan,
} from "@/core/domain/services/nutrition-engine";
import { describe, expect, it } from "vitest";

describe("Nutrition Engine", () => {
  it("deve calcular corretamente o déficit moderado de -20% sobre o TDEE", () => {
    const tdee = 2500;
    const target = computeCaloricTarget(tdee, "deficit_moderate");

    expect(target.targetCalories).toBe(2000);
    expect(target.calorieDelta).toBe(-500);
  });

  it("deve distribuir macronutrientes respeitando g/kg e somar 100% das calorias totais", () => {
    const weight = 80;
    const tdee = 2500;
    const plan = computeNutritionPlan(tdee, weight, "deficit_moderate");

    // Proteína para déficit moderado = 2.0 g/kg * 80kg = 160g (640 kcal)
    expect(plan.macros.protein.grams).toBe(160);
    expect(plan.macros.protein.calories).toBe(640);

    // Gordura base = 0.8 g/kg * 80kg = 64g (576 kcal)
    expect(plan.macros.fat.grams).toBe(64);
    expect(plan.macros.fat.calories).toBe(576);

    // Carboidratos = 2000 - 640 - 576 = 784 kcal -> 784 / 4 = 196g
    expect(plan.macros.carbohydrate.grams).toBe(196);
    expect(plan.macros.carbohydrate.calories).toBe(784);

    // A soma percentual deve ser 100%
    const totalPercentage =
      plan.macros.protein.percentageOfTotal +
      plan.macros.fat.percentageOfTotal +
      plan.macros.carbohydrate.percentageOfTotal;
    expect(totalPercentage).toBe(100);
  });
});
