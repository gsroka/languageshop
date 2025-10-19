import React, { memo } from "react";
import { useProductStore } from "~/stores/useProductStore";
import { useCartStore } from "~/stores/useCartStore";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatCurrency } from "~/lib/formatters";

type CartItemProps = {
  productId: string;
  variantId: string;
  quantity: number;
};

/**
 * Cart Item
 */
export const CartItem: React.FC<CartItemProps> = memo(
  ({ productId, variantId, quantity }) => {
    const products = useProductStore((state) => state.products);
    const product = Array.isArray(products)
      ? products.find((p) => p.id === productId)
      : null;

    const variant = product?.variants.find((v) => v.id === variantId);

    const { updateQuantity, removeItem } = useCartStore();

    // Check if products, product, or variant are available
    if (!Array.isArray(products) || !product || !variant) return null;

    const price = formatCurrency(product.price);

    return (
      <div
        className="flex items-center gap-4 border-b py-4"
        data-testid="cart-item"
      >
        <Link to={`/products/${productId}`} className="block h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-16 w-16 object-cover rounded"
            loading="lazy"
          />
        </Link>
        <div className="flex-1">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            {variant.size && `${variant.size}, `}
            {variant.color}
          </p>
          <p className="text-sm font-bold">{price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              updateQuantity(productId, variantId, Number(e.target.value))
            }
            className="w-16"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(productId, variantId)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
);
