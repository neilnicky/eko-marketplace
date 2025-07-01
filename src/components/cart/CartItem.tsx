import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";

interface CartItemData {
  id: string;
  quantity: number;
}

interface ProductData {
  name: string;
  price: number;
  shipping_cost: number;
  measurement_unit: string;
  image_urls?: string[];
}

interface CartItemProps {
  item: CartItemData;
  product: ProductData;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  product,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <Image
        src={product.image_urls?.[0] || "https://via.placeholder.com/100"}
        alt={product.name || "Product Image"}
        width={80}
        height={80}
        className="w-20 h-20 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          R$ {Number(product.price).toFixed(2)} / {product.measurement_unit}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Shipping: R$ {Number(product.shipping_cost).toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            readOnly
            value={item.quantity}
            className="w-12 h-8 text-center"
          />
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          R$ {(product.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
