import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CartItem from "./CartItem";
import { useProducts } from "@/hooks/useProducts";
import { CartItem as CartItemType } from "@/store/slices/cart";
interface CartItemsProps {
  cartItemsCount: number;
  items: Record<string, CartItemType>;
}
export default function CartItems({ cartItemsCount, items }: CartItemsProps) {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Loading cart items...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Error loading products..</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Create a products map for easier lookup
  const productsMap =
    products?.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {} as Record<string, any>) || {};

  return (
    <div className="md:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Cart Items ({cartItemsCount})</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(items).map(([productId, cartItem]) => {
            const product = productsMap[productId];
            if (!product) {
              return (
                <div key={productId} className="py-4 text-red-500">
                  Product not found: {productId}
                </div>
              );
            }

            return (
              <CartItem
                key={`cart-item-key-${productId}`}
                productId={productId}
                cartItem={cartItem}
                product={product}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
