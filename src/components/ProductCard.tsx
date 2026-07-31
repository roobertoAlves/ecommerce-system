import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { FlameIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import PriceView from "./PriceView";
import { Title } from "./ui/text";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border border-border rounded-md bg-surface group">
      <div className="relative group overflow-hidden bg-product-bg">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden transition-transform
              bg-product-bg hoverEffect ${
                product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"
              }`}
          />
        )}
        {product?.status == "new" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border border-primary/50 text-primary
          px-2 rounded-full
          group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground hoverEffect"
          >
            New Arrival!
          </p>
        )}
        <AddToWishlistButton product={product} />
        {product?.status == "sale" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border border-secondary/50 text-secondary
          px-2 rounded-full
          group-hover:border-secondary group-hover:bg-secondary group-hover:text-primary-foreground hoverEffect"
          >
            Sale!
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-highlight/50 p-1 rounded-full group-hover:border-highlight
            group-hover:text-primary hoverEffect"
          >
            <FlameIcon
              size={18}
              fill="currentColor"
              className="text-highlight/50 group-hover:text-highlight hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-text-muted">
            {product?.categories.map((cat) => cat).join(",")}
          </p>
        )}
        <Title className="text-sm line-clamp-1 font-poppins">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={13}
                key={index}
                className={index < 4 ? "text-accent" : "text-text-muted"}
                fill={index < 4 ? "var(--accent)" : "var(--text-muted)"}
              />
            ))}
          </div>
          <p className="text-accent text-xs tracking-wide">5 Reviews</p>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-danger" : "text-accent font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "Unavailable"}{" "}
          </p>
        </div>
        <PriceView price={product?.price} discount={product?.discount} />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
