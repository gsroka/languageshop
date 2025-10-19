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

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  // @info: Prepare a better solution for that in the future
  // Handle array response (from API route) and paginated response (from MSW)
  if (Array.isArray(data)) {
    // API Client: Direct array response
    return data as Product[];
  } else if (data && Array.isArray(data.products)) {
    // API Client: Paginated response
    return data.products as Product[];
  } else {
    console.error("🌐 API Client: Unexpected response format:", data);
    throw new Error("Invalid response format");
  }
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
