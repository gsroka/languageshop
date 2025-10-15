import { http, HttpResponse, delay } from "msw";
import { mockProducts } from "./data/products";

const API_URL = "/api";

/**
 * MSW request handlers that intercept fetch/XHR calls in the browser.
 * Simulates a real REST API with realistic delays and error responses.
 */
export const handlers = [
  // Get all products with optional filtering
  http.get(`${API_URL}/products`, async ({ request }) => {
    await delay(300 + Math.random() * 200);
    
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    
    let filteredProducts = mockProducts;
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    return HttpResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      page: 1,
      limit: 50
    });
  }),

  // Get a single product by ID
  http.get(`${API_URL}/products/:id`, async ({ params }) => {
    await delay(200 + Math.random() * 100);
    
    const { id } = params;
    const product = mockProducts.find((p) => p.id === id);
    
    if (!product) {
      return HttpResponse.json(
        { error: "Product not found", code: "PRODUCT_NOT_FOUND" },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(product);
  }),

];