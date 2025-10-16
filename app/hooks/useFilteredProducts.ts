import type { Product } from "~/types/Product";
import { useFilterStore } from "~/stores/useFilterStore";
import { useProductStore } from "~/stores/useProductStore";
import { useMemo } from "react";

/**
 * Custom hook that returns products filtered by the current filter state.
 */
export function useFilteredProducts(): Product[] {
  const { products } = useProductStore();
  const { category, priceRange, sizes, colors, inStock, searchQuery } =
    useFilterStore();

  return useMemo(() => {
    // Ensure products is an array before trying to filter it
    if (!Array.isArray(products)) {
      return [];
    }

    let filtered = [...products];

    // Category filter
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max,
    );

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    if (inStock) {
      filtered = filtered.filter((p) => p.variants.some((v) => v.inStock));
    }

    // Size filter
    if (sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) => v.size && sizes.includes(v.size)),
      );
    }

    // Color filter
    if (colors.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) => v.color && colors.includes(v.color)),
      );
    }

    return filtered;
  }, [products, category, priceRange, sizes, colors, inStock, searchQuery]);
}
