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
    const r = data.conversion_rates;

    return {
      usd: 1,
      eur: r.EUR,
      brl: r.BRL,
      gbp: r.GBP,
      jpy: r.JPY,
      cad: r.CAD,
      aud: r.AUD,
      mxn: r.MXN,
    };
  } catch (error) {
    console.error("Error fetching exchange rates, using fallback:", error);
    return EXCHANGE_RATES;
  }
}
