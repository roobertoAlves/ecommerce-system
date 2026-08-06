"use client";

/**
 * Thin compatibility re-export so old imports (`@/i18n/I18nContext`)
 * continue to resolve while we migrate components to useTranslations().
 *
 * DO NOT add new useT() calls — use useTranslations() directly instead.
 */

export { I18nProvider } from "./I18nProvider";
export type { AppLocale as LangCode } from "./config";

import { useCurrency } from "@/context/CurrencyContext";
import { currencyToLocale, defaultLocale, type AppLocale } from "./config";

export function useLang(): AppLocale {
  const { currency } = useCurrency();
  return currencyToLocale[currency] ?? defaultLocale;
}
