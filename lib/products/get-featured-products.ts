import { db } from "@/db";
import { products } from "@/db/schema";
import { and, desc, eq, gte } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProducts() {
  "use cache";
  const productData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.createdAt));
  return productData;
}

export async function getRecentlyAddedProducts() {
  await connection();
  const onWeekAgo = new Date();
  onWeekAgo.setDate(onWeekAgo.getDate() - 7);

  const productData = await db
    .select()
    .from(products)
    .where(
      and(eq(products.status, "approved"), gte(products.createdAt, onWeekAgo)),
    )
    .orderBy(desc(products.createdAt));

  return productData;
}

export async function getProductBySlug(slug: string) {
  const productData = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return productData?.[0] ?? null;
}
