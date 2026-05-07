"use cache";

import { getFeaturedProducts } from "@/lib/products/get-featured-products";
import ProductCard from "../product-card";

const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="p-5">
      <div className="text-mist-800 font-semibold mb-3">Featured Products</div>
      <div className="flex gap-3 flex-wrap">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
