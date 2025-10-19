import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "~/stores/useCartStore";

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("useCartStore", () => {
  it("adds a new item to the cart", () => {
    useCartStore.getState().addItem("prod-1", "var-1");
    expect(useCartStore.getState().items).toEqual([
      { productId: "prod-1", variantId: "var-1", quantity: 1 },
    ]);
  });

  it("increments quantity of existing item", () => {
    useCartStore.getState().addItem("prod-1", "var-1");
    useCartStore.getState().addItem("prod-1", "var-1");
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("updates item quantity", () => {
    useCartStore.getState().addItem("prod-1", "var-1");
    useCartStore.getState().updateQuantity("prod-1", "var-1", 3);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });

  it("removes item from cart", () => {
    useCartStore.getState().addItem("prod-1", "var-1");
    useCartStore.getState().removeItem("prod-1", "var-1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates total items correctly", () => {
    useCartStore.getState().addItem("prod-1", "var-1");
    useCartStore.getState().addItem("prod-2", "var-2");
    useCartStore.getState().addItem("prod-1", "var-1"); // +1 to first
    expect(useCartStore.getState().getTotalItems()).toBe(3);
  });
});
