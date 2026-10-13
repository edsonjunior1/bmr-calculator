"use client";

import { Input } from "@/presentation/components/ui/input";
import { Select } from "@/presentation/components/ui/select";
import { useBmrCalculatorForm } from "@/presentation/hooks/useBmrCalculatorForm";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { BmrResultCard } from "./bmr-result-card";
import { MacroDistributionCard } from "./macro-distribution-card";

export function BmrForm() {
  const translations = useTranslations("calculator");
  const { values, updateField, errors, result, nutritionPlan } =
    useBmrCalculatorForm();

  const activityOptions = [
    {
      value: "sedentary",
      label: translations("fields.activityLevel.options.sedentary.label"),
    },
    {
      value: "light",
      label: translations("fields.activityLevel.options.light.label"),
    },
    {
      value: "moderate",
      label: translations("fields.activityLevel.options.moderate.label"),
    },
    {
      value: "very_active",
      label: translations("fields.activityLevel.options.very_active.label"),
    },
    {
      value: "extra_active",
      label: translations("fields.activityLevel.options.extra_active.label"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Coluna de Entrada de Dados */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:col-span-7"
      >
        {/* Seleção do Método */}
        <div>
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {translations("methods.label")}
          </label>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => updateField("method", "mifflin_st_jeor")}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                values.method === "mifflin_st_jeor"
                  ? "border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900 dark:border-zinc-100 dark:bg-zinc-900 dark:ring-zinc-100"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {translations("methods.mifflin.title")}
                </span>
                {values.method === "mifflin_st_jeor" && (
                  <CheckCircle2 className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                )}
              </div>
              <span className="mt-1 text-xs text-zinc-500">
                {translations("methods.mifflin.badge")}
              </span>
            </button>

            <button
              type="button"
              onClick={() => updateField("method", "katch_mcardle")}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                values.method === "katch_mcardle"
                  ? "border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900 dark:border-zinc-100 dark:bg-zinc-900 dark:ring-zinc-100"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {translations("methods.katch.title")}
                </span>
                {values.method === "katch_mcardle" && (
                  <CheckCircle2 className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                )}
              </div>
              <span className="mt-1 text-xs text-zinc-500">
                {translations("methods.katch.badge")}
              </span>
            </button>
          </div>
        </div>

        {/* Inputs de Composição e Biometria */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label={translations("fields.weight.label")}
            unit={translations("fields.weight.unit")}
            placeholder={translations("fields.weight.placeholder")}
            type="number"
            step="0.1"
            value={values.weightKg}
            onChange={(e) => updateField("weightKg", e.target.value)}
            error={errors.weightKg}
          />

          {values.method === "mifflin_st_jeor" ? (
            <>
              <Input
                label={translations("fields.height.label")}
                unit={translations("fields.height.unit")}
                placeholder={translations("fields.height.placeholder")}
                type="number"
                value={values.heightCm}
                onChange={(e) => updateField("heightCm", e.target.value)}
                error={errors.heightCm}
              />
              <Input
                label={translations("fields.age.label")}
                unit={translations("fields.age.unit")}
                placeholder={translations("fields.age.placeholder")}
                type="number"
                value={values.ageYears}
                onChange={(e) => updateField("ageYears", e.target.value)}
                error={errors.ageYears}
              />
              <Select
                label={translations("fields.sex.label")}
                value={values.sex}
                onChange={(e) =>
                  updateField("sex", e.target.value as "male" | "female")
                }
                error={errors.sex}
                options={[
                  { value: "male", label: translations("fields.sex.male") },
                  { value: "female", label: translations("fields.sex.female") },
                ]}
              />
            </>
          ) : (
            <Input
              label={translations("fields.bodyFat.label")}
              unit={translations("fields.bodyFat.unit")}
              placeholder={translations("fields.bodyFat.placeholder")}
              hint={translations("fields.bodyFat.hint")}
              type="number"
              step="0.1"
              value={values.bodyFatPercentage}
              onChange={(e) => updateField("bodyFatPercentage", e.target.value)}
              error={errors.bodyFatPercentage}
            />
          )}
        </div>

        {/* Nível de Atividade Física (Fator PAL) */}
        <Select
          label={translations("fields.activityLevel.label")}
          value={values.activityLevel}
          onChange={(e) =>
            updateField(
              "activityLevel",
              e.target.value as typeof values.activityLevel,
            )
          }
          error={errors.activityLevel}
          options={activityOptions}
        />
      </form>

      {/* Coluna de Resultados: TMB/TDEE + Macronutrientes */}
      <div className="flex flex-col gap-6 lg:col-span-5">
        {result && <BmrResultCard result={result} />}
        {nutritionPlan && (
          <MacroDistributionCard
            plan={nutritionPlan}
            currentGoal={values.nutritionalGoal}
            onGoalChange={(goal) => updateField("nutritionalGoal", goal)}
          />
        )}
      </div>
    </div>
  );
}
