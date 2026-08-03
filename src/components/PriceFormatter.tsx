import { cn } from "@/lib/utils";
import { getLocaleConfig, SupportedCurrency } from "../../actions/currency";

interface Props {
  amount: number | undefined;
  className?: string;
  currency?: SupportedCurrency;
}

const PriceFormatter = ({ amount, className, currency = "usd" }: Props) => {
  const { locale, currency: currencyCode } = getLocaleConfig(currency);
  const formattedPrice = new Number(amount ?? 0).toLocaleString(locale, {
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
