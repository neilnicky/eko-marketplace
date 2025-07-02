import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  quantity: number;
  price: number;
}

interface CartState {
  items: Record<string, CartItem>;
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
      const item = state.items[productId];

      if (item) {
        item.quantity += quantity;
      } else {
        state.items[productId] = { quantity, price };
      }

      state.totalItems += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items[productId];

      if (!item) return;

      const removeQty = Math.min(quantity, item.quantity);
      item.quantity -= removeQty;
      state.totalItems -= removeQty;
      state.totalPrice -= item.price * removeQty;

      if (item.quantity <= 0) {
        delete state.items[productId];
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    // setCartFromDB: (state, action: PayloadAction<Record<string, CartItem>>) => {
    //   state.items = action.payload;

    //   // Recalculate totals
    //   let totalItems = 0;
    //   let totalPrice = 0;
    //   for (const item of Object.values(action.payload)) {
    //     totalItems += item.quantity;
    //     totalPrice += item.quantity * item.price;
    //   }

    //   state.totalItems = totalItems;
    //   state.totalPrice = totalPrice;
    // },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
