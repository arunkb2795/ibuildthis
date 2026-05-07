"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { productSchema } from "@/validations/product-validation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export type FormState = {
  success: boolean;
  error?: Record<string, string[]>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  try {
    const { userId } = await auth();

    console.log({ userId });

    if (!userId) {
      return {
        success: false,
        message: "You need to sign to create product!",
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";
    const rowFormData = Object.fromEntries(formData.entries());

    const validatedData = productSchema.safeParse(rowFormData);

    if (!validatedData.success) {
      console.log("ERROR:", validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        error: validatedData.error.flatten().fieldErrors,
        message: "Invalid product data. Please check the form and try again.",
      };
    }
    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;
    console.log({ name, slug, tagline, description, websiteUrl, tags });

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags,
      status: "approved",
      submittedBy: userEmail,
      userId,
    });

    return {
      success: true,
      message:
        "Product added successfully! it will be reviewed by our team shortly.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.flatten().fieldErrors,
        message: "Invalid product data. Please check the form and try again.",
      };
    }

    const normalizedError: Record<string, string[]> = {
      form: [
        error instanceof Error ? error.message : String(error ?? "Unknown error"),
      ],
    };

    return {
      success: false,
      error: normalizedError,
      message: "Failed to add product. Please try again later.",
    };
  }
};

export const upVoteProductAction = async (productId: number) => {
  try {
    const { userId } = await auth();

    console.log({ userId });

    if (!userId) {
      return {
        success: false,
        message: "You need to sign to create product!",
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, ${products.voteCount}) + 1`,
      })
      .where(eq(products.id, productId));

    // Get the product slug to revalidate the specific page
    const product = await db
      .select({ slug: products.slug })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length > 0) {
      revalidatePath(`/product/${product[0].slug}`);
    }

    revalidatePath("/");
    revalidatePath("/explore");

    return {
      success: true,
      message: "Product upvoted successfully!",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "Failed to upvote the product. Please try again later.",
    };
  }
};

export const downVoteProductAction = async (productId: number) => {
  try {
    const { userId } = await auth();

    console.log({ userId });

    if (!userId) {
      return {
        success: false,
        message: "You need to sign to create product!",
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, ${products.voteCount} - 1)`,
      })
      .where(eq(products.id, productId));

    // Get the product slug to revalidate the specific page
    const product = await db
      .select({ slug: products.slug })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length > 0) {
      revalidatePath(`/product/${product[0].slug}`);
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Product downvoted successfully!",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "Failed to downvote the product. Please try again later.",
    };
  }
};
