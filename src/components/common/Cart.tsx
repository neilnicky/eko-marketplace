"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface CartProps {
  itemCount?: number;
  href?: string;
  className?: string;
}

export default function Cart({
  itemCount = 0,
  href = "/cart",
  className = "",
}: CartProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative ${className}`}
      asChild
    >
      <Link href={href} aria-label={`Shopping cart with ${itemCount} items`}>
        <ShoppingBag className="h-6 w-6 text-foreground" aria-hidden="true" />
        {itemCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[1.25rem]"
            aria-label={`${itemCount} items in cart`}
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
