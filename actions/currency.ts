export type SupportedCurrency = "usd" | "eur" | "brl" | "gbp" | "jpy" | "cad" | "aud" | "mxn";

export interface LocaleConfig {
  currency: SupportedCurrency;
  locale: string;
  label: string;
  flag: string;
  language: string;
  region: string;
}

export const LOCALE_CONFIGS: LocaleConfig[] = [
  { currency: "usd", locale: "en-US", label: "United States",  flag: "🇺🇸", language: "English",   region: "US" },
  { currency: "eur", locale: "de-DE", label: "Europe",          flag: "🇪🇺", language: "European",  region: "EU" },
  { currency: "brl", locale: "pt-BR", label: "Brasil",          flag: "🇧🇷", language: "Português", region: "BR" },
  { currency: "gbp", locale: "en-GB", label: "United Kingdom",  flag: "🇬🇧", language: "English",   region: "GB" },
  { currency: "jpy", locale: "ja-JP", label: "Japan",           flag: "🇯🇵", language: "日本語",     region: "JP" },
  { currency: "cad", locale: "en-CA", label: "Canada",          flag: "🇨🇦", language: "English",   region: "CA" },
  { currency: "aud", locale: "en-AU", label: "Australia",       flag: "🇦🇺", language: "English",   region: "AU" },
  { currency: "mxn", locale: "es-MX", label: "México",          flag: "🇲🇽", language: "Español",   region: "MX" },
];

export function getLocaleConfig(currency: SupportedCurrency): LocaleConfig {
  return LOCALE_CONFIGS.find((c) => c.currency === currency) ?? LOCALE_CONFIGS[0];
}

export const EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  usd: 1,
  eur: 0.92,
  brl: 5.75,
  gbp: 0.79,
  jpy: 149.5,
  cad: 1.36,
  aud: 1.53,
  mxn: 17.2,
};
