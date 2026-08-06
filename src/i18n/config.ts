import type { SupportedCurrency } from "../../actions/currency";

export type AppLocale = "pt" | "en" | "es" | "de" | "ja";

/** All supported locales. First entry is the default. */
export const locales: AppLocale[] = ["pt", "en", "es", "de", "ja"];
export const defaultLocale: AppLocale = "pt";

/** Maps every currency code to its UI language. */
export const currencyToLocale: Record<SupportedCurrency, AppLocale> = {
  brl: "pt",
  usd: "en",
  gbp: "en",
  cad: "en",
  aud: "en",
  mxn: "es",
  eur: "de",
  jpy: "ja",
};

/** Lazily load a message file — returns the raw JSON object. */
export async function loadMessages(locale: AppLocale) {
  // next-intl expects plain objects; dynamic import works in both Edge and Node.
  const messages = (await import(`../../messages/${locale}.json`)) as {
    default: Record<string, unknown>;
  };
  return messages.default;
}
