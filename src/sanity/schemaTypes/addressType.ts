import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      description: "The Clerk user ID this address belongs to.",
      validation: (Rule) => Rule.required(),
    }),
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
      description: "Two-letter state/UF code (e.g. SP, RJ, NY)",
      validation: (Rule) => Rule.required().max(2).uppercase(),
    }),
    defineField({
      name: "zip",
      title: "ZIP / CEP",
      type: "string",
      description: "Postal code, e.g. 01310-100 or 12345",
      validation: (Rule) => Rule.required(),
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
        title: `${title}${isDefault ? " (Default)" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    },
  },
});
