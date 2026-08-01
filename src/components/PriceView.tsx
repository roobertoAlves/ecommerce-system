import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  const discountedPrice =
    price && discount ? price - (price * discount) / 100 : price;

  return (
    <div className="flex items-baseline gap-2">
      <PriceFormatter amount={discountedPrice} className={cn("text-primary font-bold", className)} />
      {price && discount ? (
        <PriceFormatter
          amount={price}
          className="line-through text-sm font-normal text-text-muted"
        />
      ) : null}
    </div>
  );
};

export default PriceView;
