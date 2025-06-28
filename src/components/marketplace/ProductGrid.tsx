"use client";

import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { data: products, isLoading, error } = useProducts();

  const handleShare = (product: Product) => {
    // Handle product sharing
    console.log("Share product:", product.id);
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} onShare={handleShare} />
      ))}
    </div>
  );
}
