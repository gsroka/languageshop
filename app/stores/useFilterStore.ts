import { create } from "zustand";
import type { FilterOptions } from "~/types/FilterOptions";

/**
 * Filter Store
 */
interface FilterStore extends FilterOptions {
  setCategory: (category: string | null) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  setInStock: (enabled: boolean) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const DEFAULT_PRICE_RANGE = { min: 0, max: 100 };

/**
 * Zustand store for managing product filters
 */
export const useFilterStore = create<FilterStore>((set, get) => ({
  category: null,
  priceRange: DEFAULT_PRICE_RANGE,
  sizes: [],
  colors: [],
  inStock: false,
  searchQuery: "",

  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  toggleSize: (size) =>
    set((state) => {
      const sizes = state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size];
      return { sizes };
    }),
  toggleColor: (color) =>
    set((state) => {
      const colors = state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color];
      return { colors };
    }),
  setInStock: (inStock) => set({ inStock }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () =>
    set({
      category: null,
      priceRange: DEFAULT_PRICE_RANGE,
      sizes: [],
      colors: [],
      inStock: false,
      searchQuery: "",
    }),
}));
