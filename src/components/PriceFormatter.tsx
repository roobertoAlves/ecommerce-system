import { cn } from "@/lib/utils";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <span className={cn("text-sm font-semibold text-text-primary font-poppins", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
