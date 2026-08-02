"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import useStore from "../../store";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { Button } from "./ui/button";

interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(`${product?.name?.substring(0, 12)}... added to cart!`);
    } else {
      toast.error("Can not add more than available stock!");
    }
  };
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-primary/80 text-primary-foreground shadow-none border border-primary/80 font-semibold tracking-wide hover:bg-primary hover:border-primary transition-all duration-300 ease-in-out hover:shadow-lg",
            className,
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
