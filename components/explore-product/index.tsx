"use client";
import { products } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProductCard from "../product-card";
import React, { useMemo } from "react";

type Products = InferSelectModel<typeof products>;

const ExploreProducts = ({ products }: { products: Products[] }) => {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<"trending" | "recent" | "explore">(
    "explore",
  );

  const filteredProducts = useMemo(() => {
    const allProducts = [...products];

    switch (sort) {
      case "trending":
        allProducts.sort((a, b) => b.voteCount - a.voteCount);
        break;
      case "recent":
        allProducts.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime(),
        );
        break;
      default:
        break;
    }

    if (query.trim() === "") {
      return allProducts;
    }

    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sort, products]);

  return (
    <div>
      <div className="text-mist-800 font-semibold mb-3">Explore Products</div>
      <Input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        onClick={() => setSort("trending")}
        variant={sort === "trending" ? "default" : "outline"}
      >
        Trending
      </Button>
      <Button
        onClick={() => setSort("recent")}
        variant={sort === "recent" ? "default" : "outline"}
      >
        Recent
      </Button>
      <div className="p-5">
        <div className="flex gap-3 flex-wrap">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProducts;
