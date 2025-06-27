import { createSlice } from "@reduxjs/toolkit";

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
