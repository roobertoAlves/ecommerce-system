"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";

import toast from "react-hot-toast";
import useStore from "../../store";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const existingProduct = favoriteProduct?.find((item) => item?._id === product?._id) ?? null;

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!",
        );
      });
    }
  };
  return (
    <div
      className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite}
        className={`p-2.5 rounded-full hoverEffect ${
          existingProduct
            ? "bg-primary text-primary-foreground hover:bg-primary-dark"
            : "bg-surface/80 text-text-muted hover:bg-primary hover:text-primary-foreground border border-border"
        }`}
      >
        <Heart size={15} />
      </div>
    </div>
  );
};

export default ProductSideMenu;
