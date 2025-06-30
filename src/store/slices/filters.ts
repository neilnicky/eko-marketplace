import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Location {
  city: string;
  state: string;
  address: string;
}

interface FiltersState {
  category: string;
  sorting: string;
  location: Location | null;
}

const initialState: FiltersState = {
  category: "",
  sorting: "",
  location: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = null;
    },
    resetFilters: (state) => {
      state.category = "";
      state.sorting = "";
      state.location = null;
    },
  },
});

export const {
  setCategory,
  setLocation,
  setSorting,
  resetFilters,
  clearLocation,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// should move to seperate
export const selectCategory = (state: { filters: FiltersState }) =>
  state.filters.category;
export const selectSorting = (state: { filters: FiltersState }) =>
  state.filters.sorting;
export const selectLocation = (state: { filters: FiltersState }) =>
  state.filters.location;
export const selectHasLocation = (state: { filters: FiltersState }) =>
  !!state.filters.location;
