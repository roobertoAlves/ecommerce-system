"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  product: Product | null | undefined;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    window.alert("Added to cart!");
  };
  return (
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
  );
};

export default AddToCartButton;
