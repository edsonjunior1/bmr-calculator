export type NutritionalGoal =
  | "deficit_aggressive" // -25%
  | "deficit_moderate" // -20%
  | "maintenance" // 0%
  | "surplus_moderate" // +10%
  | "surplus_aggressive"; // +15%

export interface CaloricTarget {
  goal: NutritionalGoal;
  targetCalories: number;
  calorieDelta: number; // Ex: -500 kcal ou +250 kcal
  percentageAdjustment: number; // Ex: -0.20 ou +0.10
}

export interface MacroNutrient {
  grams: number;
  calories: number;
  percentageOfTotal: number;
  gramsPerKg: number;
}

export interface MacroDistribution {
  protein: MacroNutrient;
  fat: MacroNutrient;
  carbohydrate: MacroNutrient;
  totalCalories: number;
}

export interface NutritionPlan {
  caloricTarget: CaloricTarget;
  macros: MacroDistribution;
}
