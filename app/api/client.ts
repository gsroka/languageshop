import type { Product } from "~/types/Product";

const API_BASE =
  typeof window === "undefined" ? "http://localhost:5173/api" : "/api";

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
