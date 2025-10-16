export interface FilterOptions {
  category: string | null;
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: string[];
  inStock: boolean;
  searchQuery: string;
}