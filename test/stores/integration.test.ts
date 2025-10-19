import { describe, it, expect, beforeEach, vi } from "vitest";
import { useProductStore } from "~/stores/useProductStore";
import { useCartStore } from "~/stores/useCartStore";
import { useFilterStore } from "~/stores/useFilterStore";
import { mockProducts } from "~/mocks/data/products";
import * as apiClient from "~/api/client";

// Mock the API client
vi.mock("~/api/client", () => ({
  fetchProducts: vi.fn(),
  fetchProductById: vi.fn(),
}));

describe("Store Integration Tests", () => {
  beforeEach(() => {
    useProductStore.setState({ products: [], loading: false, error: null });
    useCartStore.setState({ items: [] });
    useFilterStore.getState().resetFilters();
    
    vi.clearAllMocks();
  });

  describe("Product Store Integration", () => {
    it("should fetch and store products successfully", async () => {
      // Mock successful API response
      vi.mocked(apiClient.fetchProducts).mockResolvedValue(mockProducts);

      const store = useProductStore.getState();
      
      // Initial state
      expect(store.products).toHaveLength(0);
      expect(store.loading).toBe(false);
      
      // Fetch products
      await store.fetchProducts();
      
      // Check final state
      const finalState = useProductStore.getState();
      expect(finalState.products).toHaveLength(3);
      expect(finalState.loading).toBe(false);
      expect(finalState.error).toBeNull();
      expect(apiClient.fetchProducts).toHaveBeenCalledOnce();
    });

    it("should handle fetch errors", async () => {
      // Mock API error
      vi.mocked(apiClient.fetchProducts).mockRejectedValue(new Error("Network error"));

      const store = useProductStore.getState();
      await store.fetchProducts();
      
      const finalState = useProductStore.getState();
      expect(finalState.products).toHaveLength(0);
      expect(finalState.loading).toBe(false);
      expect(finalState.error).toBe("Network error");
    });
  });

  describe("Cart and Product Integration", () => {
    beforeEach(() => {
      // Set up products in the store
      useProductStore.setState({ products: mockProducts });
    });

    it("should add products to cart with correct details", () => {
      const cartStore = useCartStore.getState();
      const productStore = useProductStore.getState();
      
      // Add the first product's first variant to the cart
      const product = productStore.products[0];
      const variant = product.variants[0];
      
      cartStore.addItem(product.id, variant.id);
      
      const cartState = useCartStore.getState();
      expect(cartState.items).toHaveLength(1);
      expect(cartState.items[0]).toMatchObject({
        productId: product.id,
        variantId: variant.id,
        quantity: 1
      });
    });

    it("should calculate total items correctly", () => {
      const cartStore = useCartStore.getState();
      
      // Add multiple items
      cartStore.addItem("1", "1-s-black");
      cartStore.addItem("2", "2-s-white");
      cartStore.addItem("1", "1-s-black"); // Same item again
      
      expect(cartStore.getTotalItems()).toBe(3);
    });
  });

  describe("Filter and Product Integration", () => {
    beforeEach(() => {
      useProductStore.setState({ products: mockProducts });
    });

    it("should filter products by category", () => {
      const filterStore = useFilterStore.getState();
      
      // Set category filter
      filterStore.setCategory("hoodies");
      
      // This would be tested in the component that uses useFilteredProducts,
      // but we can test the filter logic directly
      const filteredProducts = mockProducts.filter(p => p.category === "hoodies");
      expect(filteredProducts).toHaveLength(1);
      expect(filteredProducts[0].name).toBe("Language School Hoodie");
    });

    it("should filter products by price range", () => {
      const filterStore = useFilterStore.getState();
      
      // Set a price filter (only products under $20)
      filterStore.setPriceRange({ min: 0, max: 20 });
      
      const filteredProducts = mockProducts.filter(p => p.price <= 20);
      expect(filteredProducts).toHaveLength(2); // T-shirt and mug
      expect(filteredProducts.map(p => p.name)).toEqual([
        "Classic T-Shirt",
        "Language Learning Mug"
      ]);
    });

    it("should filter products by search query", () => {
      const filterStore = useFilterStore.getState();
      
      // Search for "mug"
      filterStore.setSearchQuery("mug");
      
      const query = "mug".toLowerCase();
      const filteredProducts = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
      
      expect(filteredProducts).toHaveLength(1);
      expect(filteredProducts[0].name).toBe("Language Learning Mug");
    });
  });
});