"use client"

import { Badge, ShoppingCart, Ticket, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import CartItem from "./CartItem";
import { useProducts } from "@/hooks/useProducts";

export default function CartPage() {
  const { data: products } = useProducts();
  const { items, totalItems, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );
  const productIds = Object.keys(items);
  const [zipCode, setZipCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = totalPrice;
  const totalShipping = 49; // Example: shipping logic
  const discountAmount = appliedCoupon ? 10 : 0; // Mock value
  const total = subtotal + totalShipping - discountAmount;

  const user = true; // Mock user check
  const pointsToEarn = Math.floor(total / 10); // Example points logic

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          <span>Your Cart</span>
        </h1>
      </div>

      {productIds.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-card">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Link href="market">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({totalItems})</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(items).map(([productId, item]) => (
                  <CartItem
                    key={productId}
                    item={{ id: productId, quantity: item.quantity }}
                    product={products[productId]}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ZIP Code for Shipping */}
                <div className="space-y-2">
                  <Label htmlFor="zipcode">ZIP Code for Shipping</Label>
                  <Input
                    id="zipcode"
                    placeholder="00000-000"
                    value={zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      const formattedZip = value
                        .replace(/(\d{5})(\d)/, "$1-$2")
                        .slice(0, 9);
                      setZipCode(formattedZip);
                    }}
                    className="text-sm"
                  />
                  {/* {locationInfo && (
                    <p className="text-xs text-muted-foreground">
                      {locationInfo}
                    </p>
                  )} */}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>

                  {totalItems > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      {/* <span
                        className={totalShipping === 0 ? "text-green-600" : ""}
                      >
                        {totalShipping === 0
                          ? "Free"
                          : `R$ ${totalShipping.toFixed(2)}`}
                      </span> */}
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>- R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                <div className="border-t pt-4">
                  {!appliedCoupon && !showCouponInput && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 text-primary"
                      onClick={() => setShowCouponInput(true)}
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      Do you have a coupon?
                    </Button>
                  )}
                  {!appliedCoupon && showCouponInput && (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button
                        //   onClick={applyCoupon}
                        variant="outline"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-green-600">
                        Coupon applied: <Badge>{appliedCoupon.code}</Badge>
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        // onClick={removeCoupon}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-red-500 text-xs mt-1">{couponError}</p>
                  )}
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                {user && totalItems > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-500/10 p-2 rounded">
                    <Ticket className="h-4 w-4 text-blue-500" />
                    <span>Earn {pointsToEarn} points with this order!</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2 pt-4">
                <Link
                  href="market"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full"
                  )}
                >
                  Continue Shopping
                </Link>
                <Button
                  className="w-full"
                  // onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
