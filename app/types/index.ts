export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: "hoodies" | "tshirts" | "mugs" | "socks" | "zip-hoodies";
  variants: ProductVariant[];
  tags?: string[];
}

export interface ProductVariant {
  id: string;
  size?: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "ONE_SIZE";
  color?: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
