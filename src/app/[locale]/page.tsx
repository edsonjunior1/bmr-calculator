import { BmrForm } from "@/presentation/components/bmr/bmr-form";
import { LanguageSwitcher } from "@/presentation/components/bmr/language-switcher";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("calculator");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {t("header.title")}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t("header.subtitle")}
          </p>
        </div>
        <LanguageSwitcher />
      </header>

      <BmrForm />

      <footer className="mt-12 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        <p>
          <strong>{t("scientificNotes.title")}:</strong>{" "}
          {t("scientificNotes.content")}
        </p>
      </footer>
    </main>
  );
}
