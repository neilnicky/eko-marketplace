"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { useFavorites } from "@/hooks/useFavorites";
import { useInfiniteProducts } from "@/hooks/useProducts";
import { useCallback, useEffect, useRef } from "react"; // Import useRef and useCallback
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteProducts();
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);
  const { isFavorite, toggleFavorite, isToggling } = useFavorites();

  const loadMoreRef = useRef(null);

  // Callback to handle the intersection
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const options = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 1.0, // when 100% of the target is visible
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]); // Re-run effect if handleObserver changes

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <>
      {products?.pages.map((page, i) => (
        <div
          key={i}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
        >
          {page.data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAuthenticated={isAuthenticated}
              isFavorite={isFavorite(product.id)}
              isToggling={isToggling}
              onToggleFavorite={() => {
                const action = isFavorite(product.id) ? "remove" : "add";
                toggleFavorite.mutate({ product: product, action });
              }}
            />
          ))}
        </div>
      ))}
      <div ref={loadMoreRef} className="py-4 text-center">
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <p>Scroll down to load more</p>
        ) : (
          <p>No more products</p>
        )}
      </div>
    </>
  );
}
