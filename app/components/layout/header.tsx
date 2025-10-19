import { Link } from "react-router";
import { ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "~/stores/useCartStore";

/**
 * Shared Header
 * @constructor
 */
export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const hasHydrated = useCartStore((state) => state._hasHydrated);

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          LanguageShop
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-5 w-5" />
            {hasHydrated && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
