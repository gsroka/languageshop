import { create } from "zustand";
import type { Product } from "~/types/Product";
import { fetchProducts } from "~/api/client";

/**
 * Product Store
 */
interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

/**
 * Zustand store for managing product data
 */
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data, loading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load products";
      set({ error: errorMessage, loading: false });
    }
  },
}));
