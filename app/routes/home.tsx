import type { Route } from "./+types/home";
import { ProductList } from "~/components/features/ProductList";
import { Outlet } from "react-router";
import { FilterPanel } from "~/components/features/FilterPanel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LanguageShop App" },
    { name: "description", content: "Welcome to Language Shop!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-1 gap-6 container mx-auto px-4 py-6">
      <aside className="w-64 flex-shrink-0">
        <FilterPanel />
      </aside>
      <ProductList />
    </div>
  );
}
