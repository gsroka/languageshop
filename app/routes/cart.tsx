import { useCartStore } from "~/stores/useCartStore";
import { CartItem } from "~/components/features/CartItem";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

/**
 * Cart Page
 * @constructor
 */
export default function CartPage() {
  const items = useCartStore((state) => state.items);

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
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
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
