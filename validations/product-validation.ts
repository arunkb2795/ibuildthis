import z from "zod";
import { ta } from "zod/locales";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(120, { message: "Name must be less than 120 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(120, { message: "Slug must be less than 140 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be URL friendly. It can only contain lowercase letters, numbers, and hyphens.",
    }),
  tagline: z
    .string()
    .min(3, { message: "Tagline must be at least 3 characters" })
    .max(140, { message: "Tagline must be less than 140 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(5000, { message: "Description must be less than 5000 characters" }),
  websiteUrl: z.string().url({ message: "Invalid URL format" }),
  tags: z
    .string()
    .min(3, { message: "Tags must be at least 3 characters" })
    .max(200, { message: "Tags must be less than 200 characters" })
    .transform((str) => str.split(",").map((tag) => tag.trim().toLowerCase())),
});
