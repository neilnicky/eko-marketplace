"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import Link from "next/link";

export default function CartFooter() {
  const { totalItems, totalPrice } = useAppSelector((state) => state.cart);
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-[70px] left-0 right-0 z-30 p-4 flex justify-center">
      <div className="w-full max-w-md rounded-2xl">
        <Link
          href="/cart"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-base h-12 flex justify-between items-center px-6 rounded-md"
        >
          <span>View Cart ({totalItems})</span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </Link>
      </div>
    </div>
  );
}
