import { cn } from "@/lib/utils";
import { SupportedCurrency } from "../../actions/createCheckoutSession";

const CURRENCY_CONFIG: Record<SupportedCurrency, { locale: string; currency: string }> = {
  usd: { locale: "en-US", currency: "USD" },
  eur: { locale: "de-DE", currency: "EUR" },
  brl: { locale: "pt-BR", currency: "BRL" },
};

interface Props {
  amount: number | undefined;
  className?: string;
  currency?: SupportedCurrency;
}

const PriceFormatter = ({ amount, className, currency = "usd" }: Props) => {
  const { locale, currency: currencyCode } = CURRENCY_CONFIG[currency];
  const formattedPrice = new Number(amount).toLocaleString(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  });
  return (
    <span className={cn("text-sm font-semibold text-text-primary font-poppins", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
