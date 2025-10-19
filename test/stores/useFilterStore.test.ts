import { describe, it, expect, beforeEach } from "vitest";
import { useProductStore } from "~/stores/useProductStore";
import { useFilterStore } from "~/stores/useFilterStore";
import { useFilteredProducts } from "~/hooks/useFilteredProducts";

beforeEach(() => {
  useProductStore.setState({
    products: [
      {
        id: "1",
        name: "Black Hoodie",
        description: "Comfortable cotton hoodie with embroidered logo",
        category: "hoodies",
        price: 49.99,
        images: [],
        variants: [{ id: "v1", inStock: true }],
      },
      {
        id: "2",
        name: "White Mug",
        description:
          "Ceramic mug perfect for your morning coffee while studying",
        category: "mugs",
        price: 14.99,
        images: [],
        variants: [{ id: "v2", inStock: true }],
      },
    ],
    loading: false,
    error: null,
  });
  useFilterStore.setState({
    category: null,
    priceRange: { min: 0, max: 100 },
    sizes: [],
    colors: [],
    inStock: false,
    searchQuery: "",
  });
});

describe("useFilteredProducts", () => {
  it("filters by category", () => {
    useFilterStore.getState().setCategory("hoodies");
    const filtered = useFilteredProducts();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("1");
  });

  it("filters by search query", () => {
    useFilterStore.getState().setSearchQuery("mug");
    const filtered = useFilteredProducts();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toContain("Mug");
  });
});
