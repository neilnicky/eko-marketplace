import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  category: "all",
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
      state.category = "all";
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

// should move to seperate// Base selectors
export const selectFilters = (state: RootState) => state.filters;

// Memoized selectors using createSelector for better performance
export const selectCategory = createSelector(
  [selectFilters],
  (filters) => filters.category
);

export const selectSorting = createSelector(
  [selectFilters],
  (filters) => filters.sorting
);

export const selectLocation = createSelector(
  [selectFilters],
  (filters) => filters.location
);

export const selectHasLocation = createSelector(
  [selectLocation],
  (location) => !!location
);

// Derived selectors
export const selectIsDefaultCategory = createSelector(
  [selectCategory],
  (category) => category === "all"
);

export const selectActiveFiltersCount = createSelector(
  [selectCategory, selectSorting, selectLocation],
  (category, sorting, location) => {
    let count = 0;
    if (category && category !== "all") count++;
    if (sorting) count++;
    if (location) count++;
    return count;
  }
);

// export const selectCategory = (state: { filters: FiltersState }) =>
//   state.filters.category;
// export const selectSorting = (state: { filters: FiltersState }) =>
//   state.filters.sorting;
// export const selectLocation = (state: { filters: FiltersState }) =>
//   state.filters.location;
// export const selectHasLocation = (state: { filters: FiltersState }) =>
//   !!state.filters.location;
