"use client";

import CartControls from "@/components/marketplace/CartControls";
import QrModal from "@/components/marketplace/QRModal";
import ShareOptions from "@/components/marketplace/ShareOptions";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useCartQuantityHandler } from "@/hooks/useCartQuantityHandler";
import { useProduct } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Badge, ChevronLeft, Info, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const [showQrModal, setShowQrModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);
  const cartQuantity = useAppSelector(
    (state: RootState) => state.cart.items[product?.id]?.quantity || 0
  );

  const handleQuantityChange = useCartQuantityHandler(product!, cartQuantity);

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
        {/* Product Images */}
        <div className="space-y-4">
          {product?.image_urls && product.image_urls.length > 0 ? (
            <div className="space-y-2">
              <Image
                src={product.image_urls[0]}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
                width={400}
                height={400}
              />
              {product.image_urls.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.image_urls.slice(1, 5).map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-20 object-cover rounded"
                      width={400}
                      height={400}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-24 w-24 text-gray-300" />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product?.name}
            </h1>
            <p className="text-2xl font-bold text-green-600">
              R$ {Number(product?.price).toFixed(2)}
            </p>
            {product?.measurement_unit && (
              <p className="text-sm text-gray-500">
                per {product.measurement_unit}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product?.description}</p>
          </div>

          {product?.tags && product.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Project section with improved error handling */}
          {product?.project_id && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">From Project</h3>
              {product ? (
                <Link
                  href={`ProjectProfile?id=${product.id}`}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    {product.profile_picture_url ? (
                      <Image
                        src={product.profile_picture_url}
                        alt={product.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-green-600 font-bold">
                        {product.name?.[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.location?.city},{" "}
                      {product.location?.state_province}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="p-3 border rounded-lg bg-gray-50 text-gray-600 flex items-center gap-2">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">
                    Project information is currently unavailable.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <QrModal
              isOpen={showQrModal}
              onClose={() => setShowQrModal(false)}
              title={product?.name ?? ""}
              url={shareUrl}
            />
            <CartControls
              product={product!}
              quantity={cartQuantity}
              onQuantityChange={handleQuantityChange}
            />

            <div className="flex items-center gap-2">
              <ShareOptions
                url={shareUrl}
                title={product?.name ?? ""}
                onQrCodeClick={() => setShowQrModal(true)}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
