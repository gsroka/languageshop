import type { Product } from "~/types/Product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Language School Hoodie",
    description: "Comfortable cotton hoodie with embroidered logo",
    price: 45.99,
    images: ["/images/hoodie-1.jpg"],
    category: "hoodies",
    variants: [
      { id: "1-s-black", size: "S", color: "Black", inStock: true },
      { id: "1-m-black", size: "M", color: "Black", inStock: true },
      { id: "1-l-black", size: "L", color: "Black", inStock: false },
      { id: "1-s-navy", size: "XL", color: "Navy", inStock: true },
    ],
    tags: ["comfortable", "cotton", "logo"]
  },
  {
    id: "2", 
    name: "Classic T-Shirt",
    description: "Soft cotton t-shirt with school branding",
    price: 19.99,
    images: ["/images/tshirt-1.jpg"],
    category: "tshirts",
    variants: [
      { id: "2-s-white", size: "S", color: "White", inStock: true },
      { id: "2-m-white", size: "M", color: "White", inStock: true },
      { id: "2-l-white", size: "L", color: "White", inStock: true },
      { id: "2-xl-white", size: "XL", color: "White", inStock: false },
    ],
    tags: ["classic", "cotton", "branding"]
  },
  {
    id: "3",
    name: "Language Learning Mug",
    description: "Ceramic mug perfect for your morning coffee while studying",
    price: 12.99,
    images: ["/images/mug-1.jpg"],
    category: "mugs",
    variants: [
      { id: "3-onesize-white", size: "ONE_SIZE", color: "White", inStock: true },
      { id: "3-onesize-blue", size: "ONE_SIZE", color: "Blue", inStock: true },
    ],
    tags: ["ceramic", "coffee", "study"]
  }
];

export const mockCartItems = [
  { productId: "1", variantId: "1-m-black", quantity: 2 },
  { productId: "2", variantId: "2-s-white", quantity: 1 },
  { productId: "3", variantId: "3-onesize-white", quantity: 1 },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProducts.find(product => product.id === id) || null;
}