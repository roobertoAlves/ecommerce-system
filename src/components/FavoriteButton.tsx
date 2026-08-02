"use client";
import { Product } from "@/sanity.types";
import useStore from "../../store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const existingProduct =
    favoriteProduct.find((item: Product) => item?._id === product?._id) ?? null;

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct ? "Product removed successfully!" : "Product added successfully!",
        );
      });
    }
  };

  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-6 h-6 text-text-muted group-hover:text-primary hoverEffect" />
          <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-0.5">
            {favoriteProduct?.length ?? 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-primary hoverEffect border border-primary/40 hover:border-primary p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="currentColor"
              className="text-primary hoverEffect w-5 h-5"
            />
          ) : (
            <Heart className="text-primary/60 group-hover:text-primary hoverEffect w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
