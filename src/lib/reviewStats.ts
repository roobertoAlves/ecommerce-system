const REVIEW_POOL = [
  {
    id: 1,
    name: "Alex Johnson",
    date: "January 12, 2025",
    rating: 5,
    comment:
      "Excellent product! Exactly as described. Fast shipping and great packaging. Would definitely buy again.",
  },
  {
    id: 2,
    name: "Maria Silva",
    date: "February 3, 2025",
    rating: 4,
    comment:
      "Very good quality. The product met my expectations. Minor issue with the packaging but the item itself is perfect.",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    date: "March 18, 2025",
    rating: 5,
    comment:
      "Amazing! Best purchase I've made this year. Highly recommend to everyone.",
  },
  {
    id: 4,
    name: "Sarah Williams",
    date: "April 5, 2025",
    rating: 5,
    comment:
      "Incredible value for money. The build quality is outstanding and it arrived well ahead of schedule.",
  },
  {
    id: 5,
    name: "Lucas Oliveira",
    date: "April 22, 2025",
    rating: 4,
    comment:
      "Great product overall. Setup was straightforward and performance exceeded my expectations.",
  },
  {
    id: 6,
    name: "Emma Thompson",
    date: "May 1, 2025",
    rating: 5,
    comment:
      "Absolutely love it! The quality is top-notch and customer support was very helpful when I had questions.",
  },
  {
    id: 7,
    name: "Rafael Costa",
    date: "May 14, 2025",
    rating: 3,
    comment:
      "Good product but delivery took longer than expected. The item itself works perfectly though.",
  },
  {
    id: 8,
    name: "Priya Patel",
    date: "May 28, 2025",
    rating: 5,
    comment:
      "Perfect in every way. I've already recommended it to three friends. Will definitely purchase again.",
  },
  {
    id: 9,
    name: "James Miller",
    date: "June 3, 2025",
    rating: 4,
    comment:
      "Solid product with great features. Minor cosmetic imperfection on arrival but nothing that affects functionality.",
  },
  {
    id: 10,
    name: "Ana Rodrigues",
    date: "June 10, 2025",
    rating: 5,
    comment:
      "Surpassed all my expectations. The attention to detail is remarkable. 10/10 would buy again.",
  },
  {
    id: 11,
    name: "Daniel Park",
    date: "June 21, 2025",
    rating: 4,
    comment:
      "Really satisfied with this purchase. Arrived quickly and works exactly as advertised.",
  },
  {
    id: 12,
    name: "Sofia Fernandez",
    date: "July 2, 2025",
    rating: 5,
    comment:
      "Outstanding quality! The packaging was eco-friendly and the product exceeded every expectation.",
  },
  {
    id: 13,
    name: "Liam Chen",
    date: "July 15, 2025",
    rating: 3,
    comment:
      "Decent product for the price. A few minor quirks but nothing that impacts daily use significantly.",
  },
  {
    id: 14,
    name: "Amara Okonkwo",
    date: "July 20, 2025",
    rating: 5,
    comment:
      "Phenomenal! Every detail is thoughtfully crafted. This is now my go-to choice and I've already gifted one to a friend.",
  },
  {
    id: 15,
    name: "Tom Hargreaves",
    date: "July 28, 2025",
    rating: 4,
    comment:
      "Very impressed with the build quality. Delivery was faster than expected and customer support was responsive.",
  },
];

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = (Math.imul(31, hash) + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

export function getReviewStats(seedSource: string | undefined | null) {
  const seed = hashString(seedSource ?? "default");
  return {
    totalCount: 18 + (seed % 412),
    avgRating: 3.8 + (seed % 13) / 10,
  };
}

export function getReviewSamples(
  seedSource: string | undefined | null,
  count: number,
) {
  const seed = hashString(seedSource ?? "default");
  const offset = seed % REVIEW_POOL.length;
  return Array.from(
    { length: count },
    (_, index) => REVIEW_POOL[(offset + index) % REVIEW_POOL.length],
  );
}
