"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  EXCHANGE_RATES,
  getLocaleConfig,
  LOCALE_CONFIGS,
  LocaleConfig,
  SupportedCurrency,
} from "../../actions/currency";
import { getExchangeRates } from "../../actions/getExchangeRates";

interface CurrencyContextValue {
  currency: SupportedCurrency;
  rates: Record<SupportedCurrency, number>;
  config: LocaleConfig;
  allConfigs: LocaleConfig[];
  setCurrency: (c: SupportedCurrency) => void;
  convert: (usdAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>("usd");
  const [rates, setRates] = useState(EXCHANGE_RATES);

  useEffect(() => {
    const saved = localStorage.getItem(
      "preferred-currency",
    ) as SupportedCurrency | null;
    if (saved && LOCALE_CONFIGS.some((c) => c.currency === saved)) {
      setCurrencyState(saved);
    }
  }, []);

  useEffect(() => {
    getExchangeRates().then(setRates);
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    localStorage.setItem("preferred-currency", c);
  };

  const convert = (usdAmount: number) => usdAmount * (rates[currency] ?? 1);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        rates,
        config: getLocaleConfig(currency),
        allConfigs: LOCALE_CONFIGS,
        setCurrency,
        convert,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx)
    throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
