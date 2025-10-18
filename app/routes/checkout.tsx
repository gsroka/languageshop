import { CheckoutForm } from "~/components/features/CheckoutForm";

export default function CheckoutPage() {
  return     (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}