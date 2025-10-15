import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchProductById } from "~/api/client";
import type { Product } from "~/types";

/**
 * Product Detail Page
 * @constructor
 */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Product not found (no ID)");
      setLoading(false);
      return;
    }
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const product = await fetchProductById(id);
        setProduct(product);
      } catch (error) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category:</h3>
        <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Available Variants:</h3>
        <div className="space-y-2">
          {product.variants.map((variant) => (
            <div key={variant.id} className="flex items-center gap-2">
              <span>{variant.size}</span>
              <span>{variant.color}</span>
              <span className={variant.inStock ? "text-green-600" : "text-red-600"}>
                {variant.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
