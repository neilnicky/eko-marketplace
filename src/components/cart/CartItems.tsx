import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CartItem from "./CartItem";

export default function CartItems({ cartItemsCount, items, products }) {
  return (
    <div className="md:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Cart Items ({cartItemsCount})</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(items).map(([productId, items]) => (
            <CartItem
              key={productId}
              items={items}
              product={products![productId]}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
