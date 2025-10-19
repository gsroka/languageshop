import React, { memo, useMemo, useState } from "react";
import type { Product } from "~/types/Product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { BadgeIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useCartStore } from "~/stores/useCartStore";
import { Link } from "react-router";
import { formatCurrency } from "~/lib/formatters";

type ProductCardProps = {
  product: Product;
};

/**
 * Reusable product card displaying name, price, category, and image.
 * Optimized with React.memo to prevent unnecessary re-renders.
 */
export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const price = useMemo(() => formatCurrency(product.price), [product.price]);
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    const firstVariant = product.variants[0]; // @info: temporary
    if (firstVariant && firstVariant.inStock) {
      setIsAdding(true);
      addItem(product.id, firstVariant.id);
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  const disabled = !product.variants.some((v) => v.inStock) || isAdding;

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <Link
        to={`/products/${product.id}`}
        className="h-48 overflow-hidden bg-muted flex-shrink-0"
        data-testid="product-card"
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </Link>
      <div className="flex flex-col flex-grow">
        <CardHeader className="p-4 flex items-start justify-between">
          <div className="flex flex-col flex-1">
            <CardTitle className="line-clamp-1 text-lg mb-1">
              {product.name}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <BadgeIcon className="w-4 h-4" />
              <span className="text-sm">
                {product.category.replace("-", " ")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex justify-between p-4 pt-2">
          <span className="text-lg font-bold">{price}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.variants.some((v) => v.inStock)}
            className="cursor-pointer"
          >
            <ShoppingCartIcon className="mr-1 h-4 w-4" />
            {isAdding
              ? "Adding..."
              : product.variants.some((v) => v.inStock)
                ? "Add to Cart"
                : "Out of Stock"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
});
