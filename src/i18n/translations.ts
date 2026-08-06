/**
 * Legacy file — kept only for backward-compat imports.
 * All translations now live in messages/*.json and are
 * served through next-intl (useTranslations / getTranslations).
 *
 * DO NOT add new translations here.
 */

export type Locale = "en" | "pt" | "es" | "de" | "ja";

// Re-export the canonical type so old imports still compile
export type { AppLocale } from "./config";
