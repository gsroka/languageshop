import React, { memo, useMemo } from "react";
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

  const handleAddToCart = () => {
    const firstVariant = product.variants[0]; // @info: temporary
    if (firstVariant && firstVariant.inStock) {
      addItem(product.id, firstVariant.id);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="block h-full" data-testid="product-card">
      <Card className="flex flex-col overflow-hidden">
        <div className="h-48 overflow-hidden bg-muted">
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
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
          <BadgeIcon className="w-fit">
            {product.category.replace("-", " ")}
          </BadgeIcon>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex justify-between p-4 pt-2">
          <span className="text-lg font-bold">{price}</span>
          <Button size="sm" onClick={handleAddToCart} disabled={!product.variants.some(v => v.inStock)}>
            <ShoppingCartIcon className="mr-1 h-4 w-4" />
            {product.variants.some(v => v.inStock) ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
});
