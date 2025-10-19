import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import type { Product, ProductVariant } from "~/types/Product";
import { useCartStore } from "~/stores/useCartStore";
import { formatCurrency } from "~/lib/formatters";

/**
 * Custom Hook for Product Detail Page
 * @param product
 */
export const useProductDetail = (product: Product) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  // Auto-select first available variant logic
  useEffect(() => {
    if (product && !selectedVariant) {
      const firstInStock = product.variants.find((v) => v.inStock);
      if (firstInStock) {
        setSelectedVariant(firstInStock);
      } else {
        setError("This product is currently out of stock.");
      }
    }
  }, [product, selectedVariant]);

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant) return;
    addItem(product.id, selectedVariant.id);
    navigate("/cart");
  }, [selectedVariant, addItem, product.id, navigate]);

  return {
    selectedVariant,
    setSelectedVariant,
    error,
    handleAddToCart,
    price: formatCurrency(product.price),
  };
};
