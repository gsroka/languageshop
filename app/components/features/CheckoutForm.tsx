import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type CheckoutFormData, checkoutSchema } from "~/types/CheckoutSchema";
import { useCartStore } from "~/stores/useCartStore";
import { useProductStore } from "~/stores/useProductStore";
import { CheckCheckIcon } from "lucide-react";

export function CheckoutForm() {
  const { items: cartItems, clearCart } = useCartStore();
  const { products } = useProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
    },
  });

  // Calculate order summary
  const orderTotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Mock order submitted:", { cartItems });
    clearCart();
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4 flex justify-center items-center">
          <CheckCheckIcon className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button asChild>
          <Link to="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact & Shipping</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" {...register("address")} />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" {...register("postalCode")} />
                {errors.postalCode && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register("country")} />
              {errors.country && (
                <p className="text-sm text-destructive mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            const variant = product.variants.find(
              (v) => v.id === item.variantId,
            );
            const price = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price);
            return (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex justify-between"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {variant?.size && `${variant.size}, `}
                    {variant?.color}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <p>{price}</p>
              </div>
            );
          })}
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total:</span>
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(orderTotal)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
