"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/store";

export default function CartPage() {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const productIds = Object.keys(items);

  if (productIds.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">Your cart is empty.</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-6"></div>
    </div>
  );
}
