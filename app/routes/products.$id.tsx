import { Link, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { BadgeIcon, ShoppingCartIcon } from "lucide-react";
import type { Product, ProductVariant } from "~/types/Product";
import { fetchProductById } from "~/api/client";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { useProductDetail } from "~/hooks/useProductDetail";

/**
 * Loader React Router (SSR & SPA)
 */
export async function loader({ params }: { params: { id: string } }) {
  if (!params.id) throw new Response("Missing product ID", { status: 400 });
  const product = await fetchProductById(params.id);
  if (!product) throw new Response("Product not found", { status: 404 });
  return product;
}

/**
 * Variant Selector
 * @param product
 * @param selectedVariant
 * @param setSelectedVariant
 * @constructor
 */
function VariantSelector({
  product,
  selectedVariant,
  setSelectedVariant,
}: {
  product: Product;
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (v: ProductVariant | null) => void;
}) {
  return (
    <>
      <div>
        <h3 className="font-medium">Size</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <Button
              key={variant.id}
              variant={
                selectedVariant?.id === variant.id ? "default" : "outline"
              }
              size="sm"
              disabled={!variant.inStock}
              onClick={() => setSelectedVariant(variant)}
              className="capitalize"
            >
              {variant.size || "One size"}
              {!variant.inStock && <span className="ml-1">(out of stock)</span>}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium">Color</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.from(
            new Set(product.variants.map((v) => v.color).filter(Boolean)),
          ).map((color) => {
            const variant = product.variants.find(
              (v) => v.color === color && v.inStock,
            );
            return (
              <Button
                key={color}
                variant={
                  selectedVariant?.color === color ? "default" : "outline"
                }
                size="sm"
                disabled={!variant}
                onClick={() => setSelectedVariant(variant || null)}
                className="capitalize"
              >
                {color}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/**
 * Product Detail Page
 * @constructor
 */
export default function ProductDetail() {
  const product = useLoaderData() as Product;

  const {
    selectedVariant,
    setSelectedVariant,
    error,
    handleAddToCart,
    price,
  } = useProductDetail(product);

  return (
    <div className="container mx-auto px-4">
      <Link to={`/`}>
        <Button variant="ghost" className="mb-6">
          ← Back to catalog
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex h-96 items-center justify-center border bg-muted rounded-lg">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
          ) : (
            <span className="text-muted-foreground">No image available</span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <BadgeIcon className="mb-2 capitalize">
            {product.category.replace("-", " ")}
          </BadgeIcon>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl font-bold">{price}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div className="mt-6 space-y-4">
              <VariantSelector
                product={product}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            </div>
          )}

          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={!selectedVariant || !selectedVariant.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="mr-2 h-5 w-5" />
            {selectedVariant?.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}
