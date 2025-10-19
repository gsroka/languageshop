import { useCartStore } from "~/stores/useCartStore";
import { useProductStore } from "~/stores/useProductStore";
import { CartItem } from "~/components/features/CartItem";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { useEffect } from "react";
import { StateDisplay } from "~/components/shared/state-display";

/**
 * Cart Page
 * @constructor
 */
export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const { fetchProducts, loading, products, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!hasHydrated || loading) {
    return <StateDisplay state="loading" title="Loading Cart" />;
  }

  if (error) {
    return <StateDisplay state="error" message={`Error loading products: ${error}`} />;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <StateDisplay state="empty" message="No products available" />;
  }

  if (items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link to="/">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6" data-testid="shopping-cart-title">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={`${item.productId}-${item.variantId}`}
            productId={item.productId}
            variantId={item.variantId}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Button asChild size="lg">
          <Link to="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
