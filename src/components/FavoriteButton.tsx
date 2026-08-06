"use client";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import useStore from "../../store";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const t = useTranslations("favorite");
  const { favoriteProduct, addToFavorite } = useStore();
  const existingProduct = favoriteProduct.find((item: Product) => item?._id === product?._id) ?? null;

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(existingProduct ? t("removed") : t("added"));
      });
    }
  };

  if (showProduct) {
    return (
      <button
        onClick={handleFavorite}
        className={`p-3 rounded-full border transition-colors duration-200 ${
          existingProduct
            ? "bg-primary border-primary text-primary-foreground"
            : "border-border text-text-muted hover:border-primary hover:text-primary"
        }`}
        aria-label={existingProduct ? t("removed") : t("added")}
      >
        <Heart size={18} fill={existingProduct ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <Link href="/wishlist" className="group relative">
      <Heart className="w-6 h-6 text-text-muted group-hover:text-primary hoverEffect" />
      {favoriteProduct.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-0.5">
          {favoriteProduct.length}
        </span>
      )}
    </Link>
  );
};

export default FavoriteButton;
