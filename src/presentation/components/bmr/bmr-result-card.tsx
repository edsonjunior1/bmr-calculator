"use client";

import { BmrCalculationOutput } from "@/core/domain/models/calculation";
import { Activity, Flame, Info } from "lucide-react";
import { useTranslations } from "next-intl";

interface BmrResultCardProps {
  result: BmrCalculationOutput;
}

export function BmrResultCard({ result }: BmrResultCardProps) {
  const translation = useTranslations("calculator.results");

  const deficitCalories = Math.round(result.tdee * 0.8); //-20%
  const surplusCalories = Math.round(result.tdee * 1.1); //+10%

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {translation("title")}
        </h2>
        <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-mono text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {result.method === "katch_mcardle"
            ? "Katch-McArdle"
            : "Mifflin-St Jeor"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* TMB Card */}
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Flame className="h-4 w-4 text-orange-500" />
            <h3 className="text-xs font-medium uppercase tracking-wider">
              {translation("bmr.label")}
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {result.bmr}{" "}
            <span className="text-sm font-normal text-zinc-500">kcal/dia</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {result.bmrConfidenceInterval.lowerBound} -{" "}
            {result.bmrConfidenceInterval.upperBound} kcal
          </p>
        </div>

        {/* TDEE Card */}
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Activity className="h-4 w-4 text-blue-500" />
            <h3 className="text-xs font-medium uppercase tracking-wider">
              {translation("tdee.label")}
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {result.tdee}{" "}
            <span className="text-sm font-normal text-zinc-500">kcal/dia</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {result.tdeeConfidenceInterval.lowerBound} -{" "}
            {result.tdeeConfidenceInterval.upperBound} kcal
          </p>
        </div>
      </div>

      {result.leanMassKg && (
        <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-2.5 text-sm dark:bg-zinc-900">
          <span className="text-zinc-600 dark:text-zinc-400">
            {translation("leanMass.label")}:
          </span>
          <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
            {result.leanMassKg} {translation("leanMass.unit")}
          </strong>
        </div>
      )}

      {/* Faixa Fisiológica de Incerteza */}
      <div className="rounded-lg border border-amber-200/60 bg-amber-50/50 p-3.5 text-xs text-amber-900 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-200">
        <div className="flex gap-2">
          <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p>{translation("confidenceInterval.tooltip")}</p>
        </div>
      </div>

      {/* Metas Nutricionais de Referência */}
      <div className="flex flex-col gap-2 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Metas Calóricas de Referência
        </span>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
            <p className="text-zinc-500">
              {translation("macroPreview.deficit")}
            </p>
            <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-100">
              {deficitCalories} kcal
            </p>
          </div>
          <div className="rounded-lg border border-zinc-300 bg-zinc-100/60 p-2.5 dark:border-zinc-700 dark:bg-zinc-800/40">
            <p className="font-medium text-zinc-700 dark:text-zinc-300">
              {translation("macroPreview.maintenance")}
            </p>
            <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-100">
              {result.tdee} kcal
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
            <p className="text-zinc-500">
              {translation("macroPreview.surplus")}
            </p>
            <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-100">
              {surplusCalories} kcal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
