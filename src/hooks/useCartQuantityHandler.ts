import { Product } from "@/types/product";
import { useAppDispatch } from "./reduxHooks";
import { addToCart, removeFromCart } from "@/store/slices/cart";
import { useRemoveCartItem, useUpdateCartItem } from "./useUpdateDbCart";

export function useCartQuantityHandler(product: Product, cartQuantity: number) {
  const dispatch = useAppDispatch();
  const updateCart = useUpdateCartItem();
  const removeCart = useRemoveCartItem();

  const handleQuantityChange = (change: number) => {
    if (change > 0) {
      if (product.stock !== undefined && cartQuantity >= product.stock) {
        return;
      }
      // ✅ Redux
      dispatch(
        addToCart({
          productId: product.id,
          quantity: change,
          price: product.price,
        })
      );
      // ✅ DB
      updateCart.mutate({
        productId: product.id,
        quantity: change,
        price: product.price,
      });
    } else {
      dispatch(
        removeFromCart({
          productId: product.id,
          quantity: Math.abs(change),
        })
      );
      if (cartQuantity + change <= 0) {
        // Quantity becomes 0 or less → remove from DB
        removeCart.mutate({ productId: product.id });
      } else {
        // Just update reduced quantity
        updateCart.mutate({
          productId: product.id,
          quantity: change,
          price: product.price,
        });
      }
    }
  };

  return handleQuantityChange;
}
