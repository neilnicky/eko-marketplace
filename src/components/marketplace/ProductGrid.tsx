"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/store";

export default function ProductGrid() {
  const { data: products, isLoading, error } = useProducts();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const { isFavorite, toggleFavorite } = useFavorites(isAuthenticated);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAuthenticated={isAuthenticated}
          isFavorite={isFavorite(product.id)}
          onToggleFavorite={() => {
            const action = isFavorite(product.id) ? "remove" : "add";
            toggleFavorite.mutate({ productId: product.id, action });
          }}
        />
      ))}
    </div>
  );
}
