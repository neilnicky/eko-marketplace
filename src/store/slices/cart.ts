import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: { [productId: string]: number };
}

const initialState = {
  items: null,
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
