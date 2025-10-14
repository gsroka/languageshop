export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
  tags?: string[];
}

export interface ProductVariant {
  id: string;
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL'| 'XXL'| 'ONE_SIZE';
  color?: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}