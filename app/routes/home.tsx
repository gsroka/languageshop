import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LanguageShop App" },
    { name: "description", content: "Welcome to Language Shop!" },
  ];
}

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">LanguageShop</h1>
    </div>
  );
}
