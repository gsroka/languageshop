import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchProductById } from "~/api/client";
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

/**
 * Product Detail Page
 * @constructor
 */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Product not found (no ID)");
      setLoading(false);
      return;
    }
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const product = await fetchProductById(id);
        setProduct(product);
      } catch (error) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="container mx-auto py-8 px-4 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto py-8 px-4 text-center text-destructive">Error: {error}</div>;
  if (!product) return <div className="container mx-auto py-8 px-4 text-center text-muted-foreground">Product not found</div>;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="h-64 lg:h-auto lg:w-1/2 overflow-hidden bg-muted rounded-lg">
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

        <div className="lg:w-1/2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2"> {/* Adjusted padding */}
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <BadgeIcon className="w-fit">
                {product.category.replace("-", " ")}
              </BadgeIcon>
            </CardHeader>
            <CardContent className="flex-1 pb-2">
              <p className="text-lg font-bold mb-2">${product.price}</p>
              <p className="text-muted-foreground mb-4">{product.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Available Variants:</h3>
                <div className="space-y-2">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        {variant.size && <span className="mr-2">{variant.size}</span>}
                        {variant.color && <span className="capitalize">{variant.color}</span>}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        variant.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {variant.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full">
                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
