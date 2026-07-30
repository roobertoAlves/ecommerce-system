import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "object",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Addressee Name",
      type: "string",
      description: "A friendly name for the addressee, e.g., (Home, Work)",
      validation: (Rule) =>
        Rule.required()
          .max(50)
          .error("Name is required and should not exceed 50 characters."),
    }),
    defineField({
      name: "email",
      title: "User Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
      description: "The street address, e.g., 123 Main St",
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error(
            "Address is required and should be between 5 and 100 characters.",
          ),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "Two Letter state code (e.g, NY, CA, TX)",
      validation: (Rule) => Rule.required().length(2).uppercase(),
    }),
    defineField({
      name: "ZIP",
      title: "ZIP Code",
      type: "string",
      description: "Format: 12345 or 12345-6789",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{5}(-\d{4})?$/, { name: "ZIP code", invert: false })
          .error("Please enter a valid ZIP code (e.g., 12345 or 12345-6789).")
          .custom((zip: string | undefined) => {
            if (!zip) return "ZIP code is required.";
            if (!zip.match(/^\d{5}(-\d{4})?$/)) return "Please enter a valid ZIP code (e.g., 12345 or 12345-6789).";
            return true;
          }),
    }),
    defineField({
      name: "default",
      title: "Default Address",
      type: "boolean",
      description: "Mark this address as the default shipping address.",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address",
      city: "city",
      state: "state",
      isDefault: "default",
    },
    prepare({ title, subtitle, city, state, isDefault }) {
      return {
        title: `${title}, ${isDefault ? "Default" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    },
  },
});
