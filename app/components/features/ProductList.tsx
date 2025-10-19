import { useProductStore } from "~/stores/useProductStore";
import { useEffect, useRef } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { useFilteredProducts } from "~/hooks/useFilteredProducts";
import { ProductCard } from "~/components/features/ProductCard";

/**
 * Product List Component
 * @constructor
 */
export const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const hasFetchedInitialData = useRef(false);

  // Calculate filtered products based on search criteria
  const filteredProducts = useFilteredProducts();

  useEffect(() => {
    if (products.length === 0 && !loading) {
      hasFetchedInitialData.current = true;
      fetchProducts();
    }
  }, [products.length, loading, fetchProducts]);

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center text-destructive">
        Failed to load products. Please try again later.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-autopx-4">
        <h1 className="mb-6 text-3xl font-bold">Merch Collection</h1>
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
      </div>
    );
  }

  // Check if the initial fetch attempt was made
  if (
    hasFetchedInitialData.current &&
    !loading &&
    filteredProducts.length === 0
  ) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-3xl font-bold">Merch Collection</h1>
        <div className="col-span-full py-12 text-center text-muted-foreground">
          No products match your search criteria.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-3xl font-bold">Merch Collection</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
