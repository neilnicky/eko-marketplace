import { mockProducts } from "@/mockData/products";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: mockProducts,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
