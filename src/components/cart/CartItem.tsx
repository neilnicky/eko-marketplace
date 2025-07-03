import {
  addToCart,
  CartItem as CartItemType,
  removeFromCart,
} from "@/store/slices/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { Product } from "@/types/product";

interface CartItemProps {
  productId: string;
  cartItem: CartItemType;
  product: Product;
}

export default function CartItem({
  productId,
  cartItem,
  product,
}: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (change: number) => {
    if (change > 0) {
      
      dispatch(
        addToCart({
          productId,
          quantity: change,
          price: product.price,
        })
      );
    } else {
      dispatch(
        removeFromCart({
          productId,
          quantity: Math.abs(change),
        })
      );
    }
  };

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        productId,
        quantity: cartItem.quantity,
      })
    );
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <Image
        src={product.image_urls?.[0] || "/assets/ekomart_logo.png"}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md"
        width={400}
        height={400}
      />
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          R$ {Number(product.price).toFixed(2)} / {product.measurement_unit}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Shipping: R$ {Number(product.price).toFixed(2)}
          {/* need to add shipping cost */}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(-1)}
            disabled={cartItem.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            readOnly
            value={cartItem.quantity}
            className="w-12 h-8 text-center"
          />
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">
          R$ {(product.price * cartItem.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
