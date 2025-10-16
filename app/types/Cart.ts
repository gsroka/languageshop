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