"use client";

import ProductActions from "@/components/product/ProductActions";
import ProductDetails from "@/components/product/ProductDetails";
import ProductImages from "@/components/product/ProductImages";
import ProductProjectInfo from "@/components/product/ProductProjectInfo";
import ProductTags from "@/components/product/ProductTags";
import { buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useCartQuantityHandler } from "@/hooks/useCartQuantityHandler";
import { useProduct } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);
  const cartQuantity = useAppSelector(
    (state) => (product && state.cart.items[product?.id].quantity) || 0
  );
  const { handleQuantityChange } = useCartQuantityHandler(
    product!,
    cartQuantity
  );

  if (isLoading) {
    return <div>Loading product...</div>;
  }
  if (error) {
    return <div>Error loading product</div>;
  }

  const shareUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/product/${product?.id}`;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <Link
        href="/market"
        className={cn(buttonVariants({ variant: "outline" }), "mb-4")}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages
          images={product?.image_urls ?? []}
          name={product?.name ?? ""}
        />

        <div className="space-y-6">
          <ProductDetails
            name={product?.name ?? ""}
            price={product?.price ?? 0}
            unit={product?.measurement_unit}
            description={product?.description}
          />

          <ProductTags tags={product?.tags ?? []} />

          <ProductProjectInfo product={product} />

          <ProductActions
            product={product}
            quantity={cartQuantity}
            onQuantityChange={handleQuantityChange}
            shareUrl={shareUrl}
          />
        </div>
      </div>
    </div>
  );
}
