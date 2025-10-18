import { z } from "zod";

/**
 * Zod schema for checkout contact form validation.
 */
export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email({ pattern: z.regexes.html5Email }),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid postal code (e.g. 12345)"),
  country: z.string().min(2, "Country is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;