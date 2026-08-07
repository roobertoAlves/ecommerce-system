export const headerData = [
  { key: "home" as const, href: "/" },
  { key: "shop" as const, href: "/shop" },
  { key: "about" as const, href: "/about" },
  { key: "blog" as const, href: "/blog" },
  { key: "hotDeal" as const, href: "/deal" },
];

export const quickLinksData = [
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-conditions" },
  { title: "FAQ", href: "/faq" },
  { title: "Help", href: "/help" },
];

export const categoriesData = [
  { title: "Fashion", slug: "fashion" },
  { title: "Home & Garden", slug: "home-and-garden" },
  { title: "Smartphones", slug: "smartphones" },
  { title: "Mobiles", slug: "mobiles" },
  { title: "Appliances", slug: "appliances" },
  { title: "Air Conditioners", slug: "air-conditioners" },
  { title: "Kitchen Appliances", slug: "kitchen-appliances" },
  { title: "Gadget Accessories", slug: "gadget-accessories" },
  { title: "Washing Machine", slug: "washing-machine" },
  { title: "Refrigerators", slug: "refrigerators" },
  { title: "Television", slug: "television" },
];

export const productType = [
  {
    title: "All",
    value: "all",
    categorySlugs: [] as string[],
  },
  {
    title: "Gadget",
    value: "gadget",
    categorySlugs: [
      "gadget-accessories",
      "airbuds",
      "cameras",
      "smart-watches",
      "tablets",
    ],
  },
  {
    title: "Smartphones",
    value: "smartphones",
    categorySlugs: [
      "smartphones",
      "mobiles",
    ],
  },
  {
    title: "Appliances",
    value: "appliances",
    categorySlugs: [
      "appliances",
      "air-conditioners",
      "kitchen-appliances",
      "washing-machine",
      "refrigerators",
      "television",
    ],
  },
];
