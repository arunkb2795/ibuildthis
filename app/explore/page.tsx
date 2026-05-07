"use cache";
import ExploreProducts from "@/components/explore-product";
import { getFeaturedProducts } from "@/lib/products/get-featured-products";

export default async function Explore() {
  const products = await getFeaturedProducts();
  console.log("products", products);
  return (
    <div className="flex gap-3">
      <ExploreProducts products={products} />
    </div>
  );
}
