import type { CartItem } from "~/types/Cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Cart Store
 */
interface CartStore {
  items: CartItem[];
  addItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

/** Utility functions */
const findItem = (items: CartItem[], productId: string, variantId: string) =>
    items.find(item => item.productId === productId && item.variantId === variantId);

const updateItem = (items: CartItem[], productId: string, variantId: string, updater: (item: CartItem) => CartItem) =>
    items.map(item => item.productId === productId && item.variantId === variantId ? updater(item) : item);

const removeItemFromList = (items: CartItem[], productId: string, variantId: string) =>
    items.filter(item => !(item.productId === productId && item.variantId === variantId))

/**
 * Zustand store for managing cart items
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, variantId) => {
        set((state) => {
          const existing = findItem(state.items, productId, variantId);
          if (existing) {
              return { items: updateItem(state.items, productId, variantId, item => ({ ...item, quantity: item.quantity + 1 })) };
          }
          return { items: [...state.items, { productId, variantId, quantity: 1 }] };
        });
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
            items: updateItem(state.items, productId, variantId, item => ({ ...item, quantity })),
        }));
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: removeItemFromList(state.items, productId, variantId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);