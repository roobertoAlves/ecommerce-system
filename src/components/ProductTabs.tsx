"use client";
import { getReviewSamples, getReviewStats } from "@/lib/reviewStats";
import { Product } from "@/sanity.types";
import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const PAGE_SIZE = 3;

const ProductTabs = ({ product }: { product: Product | null | undefined }) => {
  const t = useTranslations("product");
  const tabs = [t("description"), t("additionalInfo"), t("reviewsTab")];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryNames = Array.isArray(product?.categories)
    ? (product.categories as unknown as string[]).filter(Boolean).join(", ")
    : "—";

  const reviews = useMemo(() => getReviewSamples(product?._id, 8), [product?._id]);
  const { totalCount, avgRating } = useMemo(() => getReviewStats(product?._id), [product?._id]);
  const fullStars = Math.round(avgRating);

  return (
    <div className="w-full mt-10 border border-border rounded-lg overflow-hidden">
      <div className="flex border-b border-border bg-bg-secondary">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary text-primary bg-surface"
                : "border-transparent text-text-muted hover:text-text-primary hover:bg-surface/50"
            }`}
          >
            {tab}
            {tab === t("reviewsTab") && (
              <span className="ml-1.5 text-xs font-normal text-text-muted">({totalCount.toLocaleString()})</span>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 bg-surface">
        {activeTab === t("description") && (
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
            {product?.description ?? t("noDescription")}
          </p>
        )}

        {activeTab === t("additionalInfo") && (
          <div className="max-w-lg">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: t("sku"), value: product?.slug?.current ?? "—" },
                  { label: t("category"), value: categoryNames },
                  { label: t("variant"), value: product?.variant ?? "—" },
                  { label: t("status"), value: product?.status ?? "—" },
                  { label: t("stock"), value: product?.stock != null ? `${product.stock} ${t("stock")}` : "—" },
                ].map(({ label, value }) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="py-3 pr-8 font-semibold text-text-primary w-40">{label}</td>
                    <td className="py-3 text-text-muted capitalize">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === t("reviewsTab") && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl border border-border">
              <div>
                <span className="text-4xl font-bold text-text-primary">{avgRating.toFixed(1)}</span>
                <span className="text-text-muted text-sm"> / 5</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={18} className={i < fullStars ? "text-accent" : "text-border"} fill={i < fullStars ? "var(--color-accent)" : "var(--color-border)"} />
                  ))}
                </div>
                <span className="text-xs text-text-muted">{t("basedOn")} {totalCount.toLocaleString()} {t("reviews")}</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.slice(0, visibleCount).map((review, idx) => (
                <div key={`${review.id}-${idx}`} className="border border-border rounded-lg p-4 space-y-2 bg-surface">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {review.name[0]}
                      </div>
                      <span className="font-semibold text-sm text-text-primary">{review.name}</span>
                    </div>
                    <span className="text-xs text-text-muted">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={13} className={i < review.rating ? "text-accent" : "text-border"} fill={i < review.rating ? "var(--color-accent)" : "var(--color-border)"} />
                    ))}
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>

            {visibleCount < reviews.length ? (
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="w-full py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-full hover:bg-primary/5 transition-all duration-200"
              >
                {t("loadMoreReviews")} ({reviews.length - visibleCount} {t("remaining")})
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(PAGE_SIZE)}
                className="w-full py-2.5 text-sm font-semibold text-text-muted border border-border rounded-full hover:bg-bg-secondary transition-all duration-200"
              >
                {t("showLessReviews")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
