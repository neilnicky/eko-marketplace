import { Product } from "@/types/product";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface CartControlsProps {
  product: Product;
  quantity: number;
  onQuantityChange: (change: number) => void;
}

export default function CartControls({
  product,
  quantity,
  onQuantityChange,
}: CartControlsProps) {
  const isOutOfStock =
    !product.available || (product.stock !== undefined && product.stock <= 0);
  const isAtMaxStock = product.stock !== undefined && quantity >= product.stock;
  if (quantity > 0) {
    return (
      <div className="flex items-center justify-center gap-1 bg-gray-100 rounded-full p-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onQuantityChange(-1);
          }}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="font-medium text-sm min-w-[20px] text-center">
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onQuantityChange(1);
          }}
          disabled={isAtMaxStock}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="w-full bg-green-600 hover:bg-green-700 text-xs py-2 h-8 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onQuantityChange(1);
      }}
      disabled={isOutOfStock}
    >
      <ShoppingCart className="h-3 w-3 mr-1" />
      {isOutOfStock ? "Unavailable" : "Add"}
    </Button>
  );
}
