"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface CartProps {
  cartItemsCount?: number;
  href?: string;
  className?: string;
}

export default function Cart({ href = "/cart", className = "" }: CartProps) {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const cartItemsCount = Object.keys(items).length;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative ${className}`}
      asChild
    >
      <Link href={href} aria-label={`Shopping cart with ${cartItemsCount} items`}>
        <ShoppingCart className="h-6 w-6 text-foreground" aria-hidden="true" />
        {cartItemsCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[1.25rem]"
            aria-label={`${cartItemsCount} items in cart`}
          >
            {cartItemsCount > 99 ? "99+" : cartItemsCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
