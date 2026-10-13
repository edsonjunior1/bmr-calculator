"use client";

import { NutritionPlan, NutritionalGoal } from "@/core/domain/models/nutrition";
import { Target } from "lucide-react";
import { useTranslations } from "next-intl";

interface MacroDistributionCardProps {
  plan: NutritionPlan;
  currentGoal: NutritionalGoal;
  onGoalChange: (goal: NutritionalGoal) => void;
}

export function MacroDistributionCard({
  plan,
  currentGoal,
  onGoalChange,
}: MacroDistributionCardProps) {
  const t = useTranslations("calculator.nutrition");
  const { caloricTarget, macros } = plan;

  const goalOptions: { value: NutritionalGoal; label: string }[] = [
    { value: "deficit_aggressive", label: t("goals.deficit_aggressive") },
    { value: "deficit_moderate", label: t("goals.deficit_moderate") },
    { value: "maintenance", label: t("goals.maintenance") },
    { value: "surplus_moderate", label: t("goals.surplus_moderate") },
    { value: "surplus_aggressive", label: t("goals.surplus_aggressive") },
  ];

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {t("title")}
          </h2>
        </div>
      </div>

      {/* Seletor de Meta */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="nutritional-goal"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          {t("goalLabel")}
        </label>
        <select
          id="nutritional-goal"
          value={currentGoal}
          onChange={(e) => onGoalChange(e.target.value as NutritionalGoal)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-100"
        >
          {goalOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Meta Calórica Diária */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-950/60 dark:bg-indigo-950/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
          {t("targetCalories")}
        </span>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {caloricTarget.targetCalories}
          </span>
          <span className="font-mono text-sm text-zinc-500">kcal/dia</span>
          {caloricTarget.calorieDelta !== 0 && (
            <span
              className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                caloricTarget.calorieDelta < 0
                  ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
              }`}
            >
              {caloricTarget.calorieDelta > 0
                ? `+${caloricTarget.calorieDelta}`
                : caloricTarget.calorieDelta}{" "}
              kcal
            </span>
          )}
        </div>
      </div>

      {/* Barra Visual de Proporção */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          style={{ width: `${macros.protein.percentageOfTotal}%` }}
          className="bg-emerald-500 transition-all duration-300"
          title={`Proteína: ${macros.protein.percentageOfTotal}%`}
        />
        <div
          style={{ width: `${macros.fat.percentageOfTotal}%` }}
          className="bg-amber-500 transition-all duration-300"
          title={`Gordura: ${macros.fat.percentageOfTotal}%`}
        />
        <div
          style={{ width: `${macros.carbohydrate.percentageOfTotal}%` }}
          className="bg-sky-500 transition-all duration-300"
          title={`Carboidratos: ${macros.carbohydrate.percentageOfTotal}%`}
        />
      </div>

      {/* Detalhamento dos Macronutrientes */}
      <div className="grid grid-cols-3 gap-3">
        {/* Proteína */}
        <div className="flex flex-col rounded-xl border border-emerald-100 bg-emerald-50/30 p-3 dark:border-emerald-950/40 dark:bg-emerald-950/10">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {t("macros.protein")}
            </span>
          </div>
          <span className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {macros.protein.grams}g
          </span>
          <span className="text-[11px] text-zinc-500">
            {macros.protein.gramsPerKg} g/kg •{" "}
            {macros.protein.percentageOfTotal}%
          </span>
        </div>

        {/* Gordura */}
        <div className="flex flex-col rounded-xl border border-amber-100 bg-amber-50/30 p-3 dark:border-amber-950/40 dark:bg-amber-950/10">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {t("macros.fat")}
            </span>
          </div>
          <span className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {macros.fat.grams}g
          </span>
          <span className="text-[11px] text-zinc-500">
            {macros.fat.gramsPerKg} g/kg • {macros.fat.percentageOfTotal}%
          </span>
        </div>

        {/* Carboidratos */}
        <div className="flex flex-col rounded-xl border border-sky-100 bg-sky-50/30 p-3 dark:border-sky-950/40 dark:bg-sky-950/10">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {t("macros.carbs")}
            </span>
          </div>
          <span className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {macros.carbohydrate.grams}g
          </span>
          <span className="text-[11px] text-zinc-500">
            {macros.carbohydrate.gramsPerKg} g/kg •{" "}
            {macros.carbohydrate.percentageOfTotal}%
          </span>
        </div>
      </div>
    </section>
  );
}
