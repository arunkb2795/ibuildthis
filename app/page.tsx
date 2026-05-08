import PWAInstall from "@/components/ios-install";
import FeaturedProducts from "@/components/landing-page/featured-products";
import RecentlyLaunchedProduct from "@/components/landing-page/recently-launched-products";
import { Suspense } from "react";
export default function Home() {
  return (
    <div>
      <PWAInstall />
      <FeaturedProducts />
      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyLaunchedProduct />
      </Suspense>
    </div>
  );
}
