import { Link } from "react-router";

/**
 * Shared Header
 * @constructor
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          LanguageShop
        </Link>
      </div>
    </header>
  );
}