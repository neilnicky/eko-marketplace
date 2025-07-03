"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const cartItemsCount = Object.keys(items).length;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          <span>Your Cart</span>
        </h1>
      </div>

      {cartItemsCount === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-card">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Link href="market">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CartItems
            cartItemsCount={cartItemsCount}
            items={items}
          />

          <CartSummary total={totalPrice} />
        </div>
      )}
    </div>
  );
}
