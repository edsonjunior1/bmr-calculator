"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: "pt-BR" | "en-US") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 p-1 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-900">
      <Globe className="ml-1.5 h-3.5 w-3.5 text-zinc-500" />
      <button
        type="button"
        onClick={() => handleLocaleChange("pt-BR")}
        className={`rounded-full px-2.5 py-1 transition-all ${
          locale === "pt-BR"
            ? "bg-white font-semibold text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => handleLocaleChange("en-US")}
        className={`rounded-full px-2.5 py-1 transition-all ${
          locale === "en-US"
            ? "bg-white font-semibold text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        EN
      </button>
    </div>
  );
}
