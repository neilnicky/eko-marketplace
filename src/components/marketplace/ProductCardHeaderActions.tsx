import { Product } from "@/types/product";
import ShareOptions from "./ShareOptions";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

interface CardHeaderActionsProps {
  product: Product;
  isFavorite: boolean;
  isAuthenticated: boolean;
  onToggleFavorite: () => void;
  onShare?: () => void;
}

export default function ProductCardHeaderActions({
  product,
  isFavorite,
  isAuthenticated,
  onToggleFavorite,
  onShare,
}: CardHeaderActionsProps) {
  const shareUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/marketplace?product=${product.id}`;

  return (
    <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between">
      <ShareOptions
        url={shareUrl}
        title={product.name}
        onQrCodeClick={onShare}
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
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        disabled={!isAuthenticated}
      >
        <Star
          className={`h-4 w-4 ${
            isFavorite ? "fill-current text-yellow-500" : "text-gray-400"
          }`}
        />
      </Button>
    </div>
  );
}
