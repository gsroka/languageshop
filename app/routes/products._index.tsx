import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchProducts } from "~/api/client";
import type { Product } from "~/types/Product";
import { StateDisplay } from "~/components/shared/state-display";

/**
 * Products List Page
 */
export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <StateDisplay state="loading" />;
  if (error) return <StateDisplay state="error" message={error} />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mt-2">
              {product.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
