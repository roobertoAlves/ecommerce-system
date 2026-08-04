export const headerData = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Hot Deal", href: "/deal" },
];

export const quickLinksData = [
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-conditions" },
  { title: "FAQ", href: "/faq" },
  { title: "Help", href: "/Help" },
];

export const categoriesData = [
  { title: "Fashion", href: "/category/fashion" },
  { title: "Home & Garden", href: "/category/home-garden" },
  { title: "Mobiles", href: "/category/mobiles" },
  { title: "Appliances", href: "/category/appliances" },
  { title: "Air Conditioners", href: "/category/air-conditioners" },
  { title: "Kitchen Appliances", href: "/category/kitchen-appliances" },
  { title: "Gadget Accessories", href: "/category/gadget-accessories" },
  { title: "Smartphones", href: "/category/smartphones" },
  { title: "Washing Machines", href: "/category/washing-machines" },
];

export const productType = [
  {
    title: "All",
    value: "all",
    variantValues: [] as string[],
    categorySlugs: [] as string[],
  },
  {
    title: "Gadget",
    value: "gadget",
    variantValues: ["gadget"],
    categorySlugs: ["gadget", "gadgets", "gadget-accessories"],
  },
  {
    title: "Smartphones",
    value: "smartphones",
    variantValues: [],
    categorySlugs: ["smartphone", "smartphones", "mobile", "mobiles"],
  },
  {
    title: "Appliances",
    value: "appliances",
    variantValues: ["appliances"],
    categorySlugs: [
      "appliance",
      "appliances",
      "air-conditioner",
      "air-conditioners",
      "kitchen-appliance",
      "kitchen-appliances",
      "washing-machine",
      "washing-machines",
      "refrigerator",
      "refrigerators",
    ],
  },
  {
    title: "Others",
    value: "others",
    variantValues: ["others"],
    categorySlugs: ["others"],
  },
];
