import { z } from "zod";

const activityLevelSchema = z.enum(
  ["sedentary", "light", "moderate", "very_active", "extra_active"],
  { message: "activityLevel.required" },
);

const baseMetricFields = {
  weightKg: z
    .number({ message: "weight.required" })
    .min(20, "weight.min")
    .max(350, "weight.max"),
  activityLevel: activityLevelSchema,
};

export const mifflinSchema = z.object({
  method: z.literal("mifflin_st_jeor"),
  ...baseMetricFields,
  heightCm: z
    .number({ message: "height.required" })
    .min(50, "height.min")
    .max(260, "height.max"),
  ageYears: z
    .number({ message: "age.required" })
    .int()
    .min(10, "age.min")
    .max(120, "age.max"),
  sex: z.enum(["male", "female"], {
    message: "sex.required",
  }),
});

export const katchMcArdleSchema = z.object({
  method: z.literal("katch_mcardle"),
  ...baseMetricFields,
  bodyFatPercentage: z
    .number({ message: "bodyFat.required" })
    .min(3, "bodyFat.min")
    .max(60, "bodyFat.max"),
});

export const bmrFormSchema = z.discriminatedUnion("method", [
  mifflinSchema,
  katchMcArdleSchema,
]);

export type BmrFormData = z.infer<typeof bmrFormSchema>;
export type MifflinFormData = z.infer<typeof mifflinSchema>;
export type KatchMcArdleFormData = z.infer<typeof katchMcArdleSchema>;
