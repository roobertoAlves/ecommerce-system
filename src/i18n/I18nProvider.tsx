"use client";

/**
 * Bridges CurrencyContext → next-intl.
 *
 * • Derives the locale from the selected currency.
 * • Persists the locale in a cookie so Server Components (getTranslations)
 *   also pick up the right language on the next request.
 * • Feeds NextIntlClientProvider so every client component can call
 *   useTranslations() without any extra wiring.
 */

import { useCurrency } from "@/context/CurrencyContext";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { currencyToLocale, defaultLocale, type AppLocale } from "./config";

// Import all message bundles up-front. They are tiny JSON files (<10 KB each)
// so loading all of them at once is fine and avoids waterfall fetches.
import de from "../../messages/de.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import ja from "../../messages/ja.json";
import pt from "../../messages/pt.json";

const messageMap: Record<AppLocale, AbstractIntlMessages> = { pt, en, es, de, ja };

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { currency } = useCurrency();
  const locale: AppLocale = currencyToLocale[currency] ?? defaultLocale;

  // Sync the locale to a cookie on every change so the server can read it
  useEffect(() => {
    document.cookie = `preferred-locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }, [locale]);

  const messages = useMemo(() => messageMap[locale], [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="America/Sao_Paulo">
      {children}
    </NextIntlClientProvider>
  );
}

/** Re-export for convenience so imports don't need to know the new path. */
export { currencyToLocale };
export type { AppLocale };
