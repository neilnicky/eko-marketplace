import { Product } from "@/types/product";
import { useAppDispatch } from "./reduxHooks";
import { addToCart, removeFromCart } from "@/store/slices/cart";

export function useCartQuantityHandler(product: Product, cartQuantity: number) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (change: number) => {
    if (change > 0) {
      if (product.stock !== undefined && cartQuantity >= product.stock) {
        return;
      }
      dispatch(
        addToCart({
          productId: product.id,
          quantity: change,
          price: product.price,
        })
      );
    } else {
      dispatch(
        removeFromCart({
          productId: product.id,
          quantity: Math.abs(change),
        })
      );
    }
  };

  return handleQuantityChange;
}
