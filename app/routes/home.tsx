import type { Route } from "./+types/home";
import { ProductList } from "~/components/features/ProductList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LanguageShop App" },
    { name: "description", content: "Welcome to Language Shop!" },
  ];
}

export default function Home() {
  return <ProductList />;
}
