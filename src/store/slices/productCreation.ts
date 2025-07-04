import { createSlice } from "@reduxjs/toolkit";

// interface ProductState {
//   items: Product[];
// }

// const initialState: ProductState = {
//   items: [],
// };

const productCreationSlice = createSlice({
  name: "productCreation",
  initialState: {
    isUnlimitedStock: false,
    agreedToTerms: false,
    agreedToContact: false,
  },
  reducers: {
    setUnlimitedStock: (state, action) => {
      state.isUnlimitedStock = action.payload;
    },
    setAgreedToTerms: (state, action) => {
      state.agreedToTerms = action.payload;
    },
    setAgreedToContact: (state, action) => {
      state.agreedToContact = action.payload;
    },
    resetProductState: (state) => {
      state.isUnlimitedStock = false;
      state.agreedToTerms = false;
      state.agreedToContact = false;
    },
  },
});

export const {
  setUnlimitedStock,
  setAgreedToTerms,
  setAgreedToContact,
  resetProductState,
} = productCreationSlice.actions;

export default productCreationSlice.reducer;
