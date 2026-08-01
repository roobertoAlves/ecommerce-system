import { Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "../../sanity.types";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 text-text-muted hover:text-primary hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-primary text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            0
          </span>
        </Link>
      ) : (
        <button className="group relative border border-primary/50 hover:border-primary hover:bg-primary/5 p-1.5 rounded-sm hoverEffect">
          <Heart className="text-primary/70 group-hover:text-primary transition-colors duration-300 w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
