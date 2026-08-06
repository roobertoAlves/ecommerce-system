"use client";

import { Product } from "@/sanity.types";
import { getReviewStats } from "@/lib/reviewStats";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import ImageView from "./ImageView";
import PriceView from "./PriceView";
import ProductCharacteristics from "./ProductCharacteristics";
import ProductTabs from "./ProductTabs";
import { CheckCircle, CornerDownLeft, StarIcon, Truck, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import Container from "./Container";

export default function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations("product");
  const { totalCount, avgRating } = getReviewStats(product._id);
  const fullStars = Math.round(avgRating);

  return (
    <Container className="py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {product.images && <ImageView images={product.images} isStock={product.stock} />}
        <div className="flex-1 flex flex-col gap-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">{product.name}</h2>
            <p className="text-sm text-text-muted tracking-wide leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className={index < fullStars ? "text-accent" : "text-muted-foreground"}
                  fill={index < fullStars ? "var(--color-accent)" : "var(--color-muted-foreground)"}
                />
              ))}
              <p className="text-xs font-semibold text-text-muted ml-1">
                ({totalCount.toLocaleString()} {t("reviews")})
              </p>
            </div>
          </div>

          <div className="border-t border-b border-border py-4 space-y-3">
            <PriceView price={product.price} discount={product.discount} className="text-3xl" />
            <div className="flex items-center gap-2">
              {(product.stock as number) > 0 ? (
                <>
                  <CheckCircle size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-primary">{t("inStock")}</span>
                </>
              ) : (
                <>
                  <XCircle size={16} className="text-danger" />
                  <span className="text-sm font-semibold text-danger">{t("outOfStock")}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full py-1 isolate">
            <AddToCartButton product={product} className="flex-1 rounded-full py-5 text-base" />
            <FavoriteButton showProduct={true} product={product} />
          </div>

          <ProductCharacteristics product={product} />

          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border py-4">
            <div className="flex items-center gap-2 text-sm text-text-muted hover:text-primary hoverEffect">
              <RxBorderSplit className="text-lg" /><p>{t("compareColor")}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted hover:text-primary hoverEffect">
              <FaRegQuestionCircle className="text-lg" /><p>{t("askQuestion")}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted hover:text-primary hoverEffect">
              <TbTruckDelivery className="text-lg" /><p>{t("deliveryReturn")}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted hover:text-primary hoverEffect">
              <FiShare2 className="text-lg" /><p>{t("share")}</p>
            </div>
          </div>

          <div className="flex flex-col rounded-md overflow-hidden border border-border">
            <div className="border-b border-border p-3 flex items-center gap-3">
              <Truck size={24} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-text-primary">{t("freeDelivery")}</p>
                <p className="text-xs text-text-muted underline underline-offset-2">{t("freeDeliveryDesc")}</p>
              </div>
            </div>
            <div className="p-3 flex items-center gap-3">
              <CornerDownLeft size={24} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-text-primary">{t("returnDelivery")}</p>
                <p className="text-xs text-text-muted">
                  {t("returnDeliveryDesc")}{" "}
                  <span className="underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                    {t("details")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductTabs product={product} />
    </Container>
  );
}
