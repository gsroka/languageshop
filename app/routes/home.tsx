import type { Route } from "./+types/home";
import { ProductList } from "~/components/features/ProductList";
import { FilterPanel } from "~/components/features/FilterPanel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LanguageShop App" },
    { name: "description", content: "Welcome to Language Shop!" },
  ];
}

export default function Home() {
  return (
    <>
      <aside className="w-64 flex-shrink-0">
        <FilterPanel />
      </aside>
      <ProductList />
    </>
  );
}
