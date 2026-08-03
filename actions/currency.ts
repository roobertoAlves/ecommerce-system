export type SupportedCurrency = "usd" | "eur" | "brl";

export const EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  usd: 1,
  eur: 0.92,
  brl: 5.75,
};
