import FeaturedProducts from "@/components/landing-page/featured-products";
import RecentlyLaunchedProduct from "@/components/landing-page/recently-launched-products";
import InstallButton from "@/components/pwa-button";
import { Suspense } from "react";
export default function Home() {
  return (
    <div>
      <InstallButton />
      <FeaturedProducts />
      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyLaunchedProduct />
      </Suspense>
    </div>
  );
}
