import QrModal from "@/components/marketplace/QRModal";
import CartControls from "@/components/cart/CartControls";
import ShareOptions from "@/components/marketplace/ShareOptions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Product } from "@/types/product";

export default function ProductActions({
  product,
  quantity,
  onQuantityChange,
  shareUrl,
}: {
  product: Product | undefined;
  quantity: number;
  onQuantityChange: (change: number) => void;
  shareUrl: string;
}) {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <div className="space-y-3">
      <QrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        title={product?.name ?? ""}
        url={shareUrl}
      />

      <CartControls
        product={product!}
        quantity={quantity}
        onQuantityChange={onQuantityChange}
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
              {/* Icon */}
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
  );
}
