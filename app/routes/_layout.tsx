import { Outlet } from "react-router";
import Header from "~/components/layout/header";
import Footer from "~/components/layout/footer";
import { FilterPanel } from "~/components/features/FilterPanel";

/**
 * Shared Layout
 * @constructor
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
}
