import { BmrCalculationInput } from "@/core/domain/models/calculation";
import { BmrFormData } from "../schemas/bmr-form.schema";

export class BmrCalculationMapper {
  public static toDomain(dto: BmrFormData): BmrCalculationInput {
    if (dto.method === "katch_mcardle") {
      return {
        method: "katch_mcardle",
        weightKg: dto.weightKg,
        bodyFatPercentage: dto.bodyFatPercentage,
        activityLevel: dto.activityLevel,
      };
    }

    return {
      method: "mifflin_st_jeor",
      weightKg: dto.weightKg,
      heightCm: dto.heightCm,
      ageYears: dto.ageYears,
      sex: dto.sex,
      activityLevel: dto.activityLevel,
    };
  }
}
