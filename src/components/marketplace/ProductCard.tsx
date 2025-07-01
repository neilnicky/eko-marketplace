import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addToCart, removeFromCart } from "@/store/slices/cart";
import { toggleFavorite } from "@/store/slices/favorites";
import { RootState } from "@/store/store";
import { Product } from "@/types/product";
import React from "react";
import { Card, CardContent } from "../ui/card";
import ProductCardHeaderActions from "./ProductCardHeaderActions";
import ProductCardImage from "./ProductCardImage";
import ProductInfo from "./ProductInfo";
import ProductPriceDisplay from "./ProductPriceDisplay";
import CartControls from "./CartControls";
import { useFavorites } from "@/hooks/useFavorites";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(
    (state: RootState) => state.cart.items[product.id]?.quantity || 0
  );

  const isReduxFavorite = useAppSelector((state: RootState) =>
    state.favorites.items.includes(product.id)
  );
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(
    product.id,
    isAuthenticated // Only fetch when authenticated
  );

  const displayFavoriteStatus = isAuthenticated ? isFavorite : isReduxFavorite;

  const handleQuantityChange = (change: number) => {
    if (change > 0) {
      if (product.stock !== undefined && cartQuantity >= product.stock) {
        return;
      }
      dispatch(
        addToCart({
          productId: product.id,
          quantity: change,
          price: product.price,
        })
      );
    } else {
      dispatch(
        removeFromCart({
          productId: product.id,
          quantity: Math.abs(change),
        })
      );
    }
  };

  const handleToggleFavorite = () => {
    // Update Redux state immediately for better UX
    dispatch(toggleFavorite(product.id));

    if (isAuthenticated) {
      // Sync with database using the mutations from useFavorites
      if (isFavorite) {
        removeFavorite.mutate(product.id);
      } else {
        addFavorite.mutate(product.id);
      }
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group relative cursor-pointer">
      <ProductCardHeaderActions
        product={product}
        isAuthenticated={isAuthenticated}
        isFavorite={displayFavoriteStatus}
        onToggleFavorite={handleToggleFavorite}
      />

      <div className="flex-1 flex flex-col">
        <ProductCardImage product={product} />

        <CardContent className="p-4 flex-grow flex flex-col">
          <ProductInfo product={product} />

          <div className="mt-auto space-y-2">
            <ProductPriceDisplay product={product} />
            <CartControls
              product={product}
              quantity={cartQuantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
