"use client";
import { Product } from "@/sanity.types";
import { StarIcon } from "lucide-react";
import { useMemo, useState } from "react";

const REVIEW_POOL = [
  { id: 1,  name: "Alex Johnson",    date: "January 12, 2025",  rating: 5, comment: "Excellent product! Exactly as described. Fast shipping and great packaging. Would definitely buy again." },
  { id: 2,  name: "Maria Silva",     date: "February 3, 2025",  rating: 4, comment: "Very good quality. The product met my expectations. Minor issue with the packaging but the item itself is perfect." },
  { id: 3,  name: "Carlos Mendes",   date: "March 18, 2025",    rating: 5, comment: "Amazing! Best purchase I've made this year. Highly recommend to everyone." },
  { id: 4,  name: "Sarah Williams",  date: "April 5, 2025",     rating: 5, comment: "Incredible value for money. The build quality is outstanding and it arrived well ahead of schedule." },
  { id: 5,  name: "Lucas Oliveira",  date: "April 22, 2025",    rating: 4, comment: "Great product overall. Setup was straightforward and performance exceeded my expectations." },
  { id: 6,  name: "Emma Thompson",   date: "May 1, 2025",       rating: 5, comment: "Absolutely love it! The quality is top-notch and customer support was very helpful when I had questions." },
  { id: 7,  name: "Rafael Costa",    date: "May 14, 2025",      rating: 3, comment: "Good product but delivery took longer than expected. The item itself works perfectly though." },
  { id: 8,  name: "Priya Patel",     date: "May 28, 2025",      rating: 5, comment: "Perfect in every way. I've already recommended it to three friends. Will definitely purchase again." },
  { id: 9,  name: "James Miller",    date: "June 3, 2025",      rating: 4, comment: "Solid product with great features. Minor cosmetic imperfection on arrival but nothing that affects functionality." },
  { id: 10, name: "Ana Rodrigues",   date: "June 10, 2025",     rating: 5, comment: "Surpassed all my expectations. The attention to detail is remarkable. 10/10 would buy again." },
  { id: 11, name: "Daniel Park",     date: "June 21, 2025",     rating: 4, comment: "Really satisfied with this purchase. Arrived quickly and works exactly as advertised." },
  { id: 12, name: "Sofia Fernandez", date: "July 2, 2025",      rating: 5, comment: "Outstanding quality! The packaging was eco-friendly and the product exceeded every expectation." },
  { id: 13, name: "Liam Chen",       date: "July 15, 2025",     rating: 3, comment: "Decent product for the price. A few minor quirks but nothing that impacts daily use significantly." },
  { id: 14, name: "Amara Okonkwo",   date: "July 20, 2025",     rating: 5, comment: "Phenomenal! Every detail is thoughtfully crafted. This is now my go-to choice and I've already gifted one to a friend." },
  { id: 15, name: "Tom Hargreaves",  date: "July 28, 2025",     rating: 4, comment: "Very impressed with the build quality. Delivery was faster than expected and customer support was responsive." },
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const PAGE_SIZE = 3;
const tabs = ["Description", "Additional Information", "Reviews"];

interface Props {
  product: Product | null | undefined;
}

const ProductTabs = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState("Description");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryNames = Array.isArray(product?.categories)
    ? (product.categories as unknown as string[]).filter(Boolean).join(", ")
    : "—";

  const { reviews, totalCount, avgRating } = useMemo(() => {
    const seed = hashString(product?._id ?? "default");
    const count = 4 + (seed % 11);
    const offset = seed % REVIEW_POOL.length;
    const picked = Array.from({ length: count }, (_, i) => REVIEW_POOL[(offset + i) % REVIEW_POOL.length]);
    const avg = picked.reduce((s, r) => s + r.rating, 0) / picked.length;
    const total = 38 + (seed % 1163);
    return { reviews: picked, totalCount: total, avgRating: avg };
  }, [product?._id]);

  const avgRatingDisplay = avgRating.toFixed(1);
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
            {tab === "Reviews" && (
              <span className="ml-1.5 text-xs font-normal text-text-muted">
                ({totalCount.toLocaleString()})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 bg-surface">
        {activeTab === "Description" && (
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
            {product?.description ?? "No description available for this product."}
          </p>
        )}

        {activeTab === "Additional Information" && (
          <div className="max-w-lg">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "SKU",      value: product?.slug?.current ?? "—" },
                  { label: "Category", value: categoryNames },
                  { label: "Variant",  value: product?.variant ?? "—" },
                  { label: "Status",   value: product?.status ?? "—" },
                  { label: "Stock",    value: product?.stock != null ? `${product.stock} units` : "—" },
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

        {activeTab === "Reviews" && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl border border-border">
              <div>
                <span className="text-4xl font-bold text-text-primary">{avgRatingDisplay}</span>
                <span className="text-text-muted text-sm"> / 5</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={18}
                      className={i < fullStars ? "text-accent" : "text-border"}
                      fill={i < fullStars ? "var(--color-accent)" : "var(--color-border)"}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-muted">
                  Based on {totalCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.slice(0, visibleCount).map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="border border-border rounded-lg p-4 space-y-2 bg-surface"
                >
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
                      <StarIcon
                        key={i}
                        size={13}
                        className={i < review.rating ? "text-accent" : "text-border"}
                        fill={i < review.rating ? "var(--color-accent)" : "var(--color-border)"}
                      />
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
                Load More Reviews ({reviews.length - visibleCount} remaining)
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(PAGE_SIZE)}
                className="w-full py-2.5 text-sm font-semibold text-text-muted border border-border rounded-full hover:bg-bg-secondary transition-all duration-200"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
