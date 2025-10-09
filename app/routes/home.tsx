import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LanguageShop App" },
    { name: "description", content: "Welcome to Language Shop!" },
  ];
}

export default function Home() {
  return <div>LanguageShop</div>;
}
