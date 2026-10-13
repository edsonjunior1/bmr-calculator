"use client";

import { BmrCalculationMapper } from "@/core/application/mappers/bmr-calculation.mapper";
import {
  BmrFormData,
  bmrFormSchema,
} from "@/core/application/schemas/bmr-form.schema";
import { BmrCalculationOutput } from "@/core/domain/models/calculation";
import { NutritionalGoal, NutritionPlan } from "@/core/domain/models/nutrition";
import { computeEnergyMetrics } from "@/core/domain/services/bmr-engine";
import { computeNutritionPlan } from "@/core/domain/services/nutrition-engine";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export interface RawFormValues {
  method: "mifflin_st_jeor" | "katch_mcardle";
  weightKg: string;
  heightCm: string;
  ageYears: string;
  sex: "male" | "female";
  bodyFatPercentage: string;
  activityLevel:
    | "sedentary"
    | "light"
    | "moderate"
    | "very_active"
    | "extra_active";
  nutritionalGoal: NutritionalGoal;
}

const DEFAULT_VALUES: RawFormValues = {
  method: "katch_mcardle",
  weightKg: "80",
  heightCm: "178",
  ageYears: "30",
  sex: "male",
  bodyFatPercentage: "15",
  activityLevel: "moderate",
  nutritionalGoal: "deficit_moderate",
};

export function useBmrCalculatorForm() {
  const tValidation = useTranslations("validation");
  const [values, setValues] = useState<RawFormValues>(DEFAULT_VALUES);

  const updateField = <K extends keyof RawFormValues>(
    field: K,
    val: RawFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
  };

  const parsedData = useMemo(() => {
    const rawDto: Record<string, unknown> = {
      method: values.method,
      weightKg: Number(values.weightKg),
      activityLevel: values.activityLevel,
    };

    if (values.method === "mifflin_st_jeor") {
      rawDto.heightCm = Number(values.heightCm);
      rawDto.ageYears = Number(values.ageYears);
      rawDto.sex = values.sex;
    } else {
      rawDto.bodyFatPercentage = Number(values.bodyFatPercentage);
    }

    return bmrFormSchema.safeParse(rawDto);
  }, [
    values.method,
    values.weightKg,
    values.heightCm,
    values.ageYears,
    values.sex,
    values.bodyFatPercentage,
    values.activityLevel,
  ]);

  const errors = useMemo<Partial<Record<keyof RawFormValues, string>>>(() => {
    if (parsedData.success) return {};

    type ValidationKey = Parameters<typeof tValidation>[0];
    const formattedErrors: Partial<Record<keyof RawFormValues, string>> = {};

    for (const issue of parsedData.error.issues) {
      const field = issue.path[0] as keyof RawFormValues;
      if (!formattedErrors[field]) {
        formattedErrors[field] = tValidation(issue.message as ValidationKey);
      }
    }
    return formattedErrors;
  }, [parsedData, tValidation]);

  const result = useMemo<BmrCalculationOutput | null>(() => {
    if (!parsedData.success) return null;
    const domainInput = BmrCalculationMapper.toDomain(
      parsedData.data as BmrFormData,
    );
    return computeEnergyMetrics(domainInput);
  }, [parsedData]);

  const nutritionPlan = useMemo<NutritionPlan | null>(() => {
    if (!result || !parsedData.success) return null;
    const weight = Number(values.weightKg);
    return computeNutritionPlan(result.tdee, weight, values.nutritionalGoal);
  }, [result, parsedData.success, values.weightKg, values.nutritionalGoal]);

  return {
    values,
    updateField,
    errors,
    result,
    nutritionPlan,
    isValid: parsedData.success,
  };
}
