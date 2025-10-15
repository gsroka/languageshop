import type { Product } from "~/types";

export const mockProducts: Product[] = [
  {
    id: "hoodie-001",
    name: "Classic Language Hoodie",
    description:
      "Soft cotton hoodie with school logo. Perfect for everyday wear.",
    price: 49.99,
    category: "hoodies",
    images: ["/images/hoodie-black.jpg"],
    variants: [
      { id: "h001-s-black", size: "S", color: "black", inStock: true },
      { id: "h001-m-black", size: "M", color: "black", inStock: true },
      { id: "h001-l-black", size: "L", color: "black", inStock: false },
    ],
  },
  {
    id: "tshirt-001",
    name: "Minimalist T-Shirt",
    description: "Lightweight cotton t-shirt with subtle language quote.",
    price: 24.99,
    category: "tshirts",
    images: ["/images/tshirt-white.jpg"],
    variants: [
      { id: "t001-m-white", size: "M", color: "white", inStock: true },
      { id: "t001-l-white", size: "L", color: "white", inStock: true },
    ],
  },
  {
    id: "mug-001",
    name: "Ceramic Coffee Mug",
    description: "11oz ceramic mug with phrase 'Speak the World'.",
    price: 14.99,
    category: "mugs",
    images: ["/images/mug.jpg"],
    variants: [
      { id: "m001-one", size: "ONE_SIZE", color: "white", inStock: true },
    ],
  },
];
