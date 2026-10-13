import {
  CaloricTarget,
  MacroDistribution,
  NutritionalGoal,
  NutritionPlan,
} from "../models/nutrition";

const GOAL_ADJUSTMENTS: Record<NutritionalGoal, number> = {
  deficit_aggressive: -0.25,
  deficit_moderate: -0.2,
  maintenance: 0.0,
  surplus_moderate: 0.1,
  surplus_aggressive: 0.15,
};

// Recomendações de proteína (g/kg) embasadas na literatura esportiva
const PROTEIN_PER_KG_BY_GOAL: Record<NutritionalGoal, number> = {
  deficit_aggressive: 2.3, // Maior aporte para preservar massa magra em corte severo
  deficit_moderate: 2.0,
  maintenance: 1.8,
  surplus_moderate: 2.0,
  surplus_aggressive: 2.0,
};

const FAT_PER_KG_BASE = 0.8; // Baseline saudável (0.8g/kg)

export function computeCaloricTarget(
  tdee: number,
  goal: NutritionalGoal,
): CaloricTarget {
  const adjustment = GOAL_ADJUSTMENTS[goal];
  const targetCalories = Math.round(tdee * (1 + adjustment));
  const calorieDelta = targetCalories - tdee;

  return {
    goal,
    targetCalories,
    calorieDelta,
    percentageAdjustment: adjustment,
  };
}

export function computeMacroDistribution(
  targetCalories: number,
  weightKg: number,
  goal: NutritionalGoal,
): MacroDistribution {
  // 1. Proteína: prioridade por g/kg
  const proteinGramsPerKg = PROTEIN_PER_KG_BY_GOAL[goal];
  const proteinGrams = Math.round(weightKg * proteinGramsPerKg);
  const proteinCalories = proteinGrams * 4;

  // 2. Gordura: baseline em g/kg, com salvaguarda mínima de 20% das calorias totais
  let fatGrams = Math.round(weightKg * FAT_PER_KG_BASE);
  let fatCalories = fatGrams * 9;
  const minFatCalories = targetCalories * 0.2;

  if (fatCalories < minFatCalories) {
    fatCalories = Math.round(minFatCalories);
    fatGrams = Math.round(fatCalories / 9);
  }

  // 3. Carboidratos: saldo calórico restante
  const remainingCalories = targetCalories - (proteinCalories + fatCalories);
  const carbCalories = Math.max(0, remainingCalories);
  const carbGrams = Math.round(carbCalories / 4);

  // Recalcula o total efetivo somando as gramas arredondadas
  const totalEffectiveCalories = proteinCalories + fatCalories + carbCalories;

  return {
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      percentageOfTotal: Math.round(
        (proteinCalories / totalEffectiveCalories) * 100,
      ),
      gramsPerKg: Number(proteinGramsPerKg.toFixed(2)),
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
      percentageOfTotal: Math.round(
        (fatCalories / totalEffectiveCalories) * 100,
      ),
      gramsPerKg: Number((fatGrams / weightKg).toFixed(2)),
    },
    carbohydrate: {
      grams: carbGrams,
      calories: carbCalories,
      percentageOfTotal: Math.round(
        (carbCalories / totalEffectiveCalories) * 100,
      ),
      gramsPerKg: Number((carbGrams / weightKg).toFixed(2)),
    },
    totalCalories: totalEffectiveCalories,
  };
}

export function computeNutritionPlan(
  tdee: number,
  weightKg: number,
  goal: NutritionalGoal,
): NutritionPlan {
  const caloricTarget = computeCaloricTarget(tdee, goal);
  const macros = computeMacroDistribution(
    caloricTarget.targetCalories,
    weightKg,
    goal,
  );

  return {
    caloricTarget,
    macros,
  };
}
