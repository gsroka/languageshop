import { useProductStore } from "~/stores/useProductStore";
import { useEffect } from "react";
import { ProductCard } from "~/components/features/ProductCard";
import { Skeleton } from "~/components/ui/skeleton";

export const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  if (error) {
    return (
      <div className="container py-8 text-center text-destructive">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-3xl font-bold">Merch Collection</h1>
      {loading && products.length === 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
