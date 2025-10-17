import { useProductStore } from "~/stores/useProductStore";
import { useCartStore } from "~/stores/useCartStore";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Trash2Icon } from "lucide-react";

/**
 * Cart Item
 * @param productId
 * @param variantId
 * @param quantity
 * @constructor
 */
export function CartItem({
  productId,
  variantId,
  quantity,
}: {
  productId: string;
  variantId: string;
  quantity: number;
}) {
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === productId),
  );

  const variant = product?.variants.find((v) => v.id === variantId);

  const { updateQuantity, removeItem } = useCartStore();

  if (!product || !variant) return null;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-16 w-16 object-cover rounded"
      />
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
}
