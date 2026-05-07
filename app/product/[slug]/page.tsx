'use cache'
import VoteButton from "@/components/vote-button";
import {
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products/get-featured-products";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const product = await getFeaturedProducts();

  return product.map((product) => ({
    slug: product.slug.toString(),
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const productDetails = await getProductBySlug(slug);

  if (!productDetails) return notFound();

  return (
    <div>
      {/* <Link href="/">Go Back</Link> */}
      <h2>{productDetails?.name}</h2>
      <p>{productDetails?.description}</p>
      <span>Vote Count: {productDetails?.voteCount}</span>
      <span>Website: {productDetails?.websiteUrl}</span>
      <span>{productDetails?.description}</span>
      <VoteButton
        id={productDetails?.id}
        voteCount={productDetails?.voteCount || 0}
      />
    </div>
  );
}
