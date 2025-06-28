import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Record<string, number>;
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: {},
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        price: number;
      }>
    ) => {
      const { productId, quantity, price } = action.payload;
      state.items[productId] = (state.items[productId] || 0) + quantity;
      state.totalItems += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        price: number;
      }>
    ) => {
      const { productId, quantity, price } = action.payload;
      const currentQuantity = state.items[productId] || 0;
      const removeQuantity = Math.min(quantity, currentQuantity);

      if (removeQuantity > 0) {
        state.items[productId] = currentQuantity - removeQuantity;
        if (state.items[productId] <= 0) {
          delete state.items[productId];
        }
        state.totalItems -= removeQuantity;
        state.totalPrice -= price * removeQuantity;
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
