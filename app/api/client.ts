import type { Product } from "~/types/Product";

// API base URL for both development and production
const API_BASE = (() => {
  // Client-side
  if (typeof window !== "undefined") {
    return "/api";
  }

  // Server-side
  if (process.env.NODE_ENV === "production") {
    return "http://localhost:3000/api";
  } else {
    return "http://localhost:5173/api";
  }
})();

/**
 * Fetch products from the server
 */
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data as Product[];
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Product not found");
    throw new Error("Failed to fetch product");
  }
  const data = await res.json();
  return data as Product;
}
