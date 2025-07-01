import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  items: string[]; // Array of product IDs
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavoriteRedux(state, action: PayloadAction<string>) {
      const index = state.items.indexOf(action.payload);
      if (index >= 0) state.items.splice(index, 1);
      else state.items.push(action.payload);
    },

    // addFavorite: (state, action: PayloadAction<string>) => {
    //   const productId = action.payload;
    //   if (!state.items.includes(productId)) {
    //     state.items.push(productId);
    //   }
    // },
    // removeFavorite: (state, action: PayloadAction<string>) => {
    //   const productId = action.payload;
    //   const index = state.items.indexOf(productId);
    //   if (index >= 0) {
    //     state.items.splice(index, 1);
    //   }
    // },
  },
});

export const { toggleFavoriteRedux } = favoritesSlice.actions;
export default favoritesSlice.reducer;
