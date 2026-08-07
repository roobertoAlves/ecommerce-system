import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const cartType = defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "productId",
              title: "Product ID",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "productId", subtitle: "quantity" },
            prepare({ title, subtitle }) {
              return { title, subtitle: `qty: ${subtitle}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "clerkUserId", items: "items" },
    prepare({ title, items }) {
      return {
        title: `Cart: ${title}`,
        subtitle: `${(items ?? []).length} item(s)`,
      };
    },
  },
});
