import type { Product } from "~/types";

const API_BASE = '/api';

/**
 * Fetch products from the server
 */
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json() as Promise<Product[]>;
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }
  return res.json() as Promise<Product>;
}