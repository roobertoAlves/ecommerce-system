import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
}

const PriceView = ({ price, discount }: Props) => {
  const discountedPrice =
    price && discount ? price - (price * discount) / 100 : price;

  return (
    <div className="flex items-center gap-2">
      <PriceFormatter amount={discountedPrice} className="text-primary font-semibold" />
      {price && discount ? (
        <PriceFormatter
          amount={price}
          className="line-through text-xs font-normal text-text-muted"
        />
      ) : null}
    </div>
  );
};

export default PriceView;
