import { getRecentlyAddedProducts } from "@/lib/products/get-featured-products";
import ProductCard from "../product-card";

const RecentlyLaunchedProduct = async () => {
  const recentlyLaunchedProducts = await getRecentlyAddedProducts();
  return (
    <div className="p-5">
      <div className="text-mist-800 font-semibold mb-3">
        Recently Launched Products
      </div>
      <div className="flex gap-2">
        {recentlyLaunchedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyLaunchedProduct;
