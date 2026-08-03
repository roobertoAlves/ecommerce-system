"use server";

import { EXCHANGE_RATES, SupportedCurrency } from "./currency";

export async function getExchangeRates(): Promise<Record<SupportedCurrency, number>> {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) throw new Error("Failed to fetch exchange rates");

    const data = await res.json();
    return {
      usd: 1,
      eur: data.conversion_rates.EUR,
      brl: data.conversion_rates.BRL,
    };
  } catch (error) {
    console.error("Error fetching exchange rates, using fallback:", error);
    return EXCHANGE_RATES;
  }
}
