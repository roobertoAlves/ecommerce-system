"use client";
import { getReviewStats } from "@/lib/reviewStats";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { FlameIcon, StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import PriceView from "./PriceView";
import ProductSideMenu from "./ProductSideMenu";
import { Title } from "./ui/text";

const ProductCard = ({ product }: { product: Product }) => {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const [imgLoaded, setImgLoaded] = useState(false);
  const { totalCount, avgRating } = getReviewStats(product?._id);
  const fullStars = Math.round(avgRating);

  return (
    <div className="text-sm border border-border rounded-md bg-surface group">
      <div className="relative group overflow-hidden bg-product-bg">
        {product?.images && (
          <Link href={`/product/${product.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.name ?? "Product"}
              width={700}
              height={700}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-64 object-contain overflow-hidden transition-all duration-500 bg-product-bg ${
                product.stock !== 0 ? "group-hover:scale-105" : "opacity-50"
              } ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-secondary/50 text-secondary px-2 rounded-full group-hover:border-secondary group-hover:bg-secondary group-hover:text-primary-foreground hoverEffect">
            Sale!
          </p>
        )}
        {product?.status === "new" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-primary/50 text-primary px-2 rounded-full group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground hoverEffect">
            New Arrival!
          </p>
        )}
        {product?.status === "hot" && (
          <Link href="/deal" className="absolute top-2 left-2 z-10 border border-highlight/50 p-1 rounded-full group-hover:border-highlight group-hover:text-primary hoverEffect">
            <FlameIcon size={18} fill="currentColor" className="text-highlight/50 group-hover:text-highlight hoverEffect" />
          </Link>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-text-muted">
            {(product.categories as unknown as string[]).map((cat) => cat).join(",")}
          </p>
        )}
        <Title className="text-sm line-clamp-1 font-poppins">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={13}
                key={index}
                className={index < fullStars ? "text-accent" : "text-muted-foreground"}
                fill={index < fullStars ? "var(--color-accent)" : "var(--color-muted-foreground)"}
              />
            ))}
          </div>
          <p className="text-text-secondary text-xs tracking-wide">
            {totalCount.toLocaleString()} {tCommon("reviews")}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <PriceView price={product?.price} discount={product?.discount} className="text-base" />
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium">{tCommon("inStock")}</p>
          <p className={`${product?.stock === 0 ? "text-danger" : "text-text-secondary font-semibold"}`}>
            {(product?.stock as number) > 0 ? product?.stock : tCommon("unavailable")}
          </p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
