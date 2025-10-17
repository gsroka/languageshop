import { Outlet } from "react-router";
import Header from "~/components/layout/header";
import Footer from "~/components/layout/footer";

/**
 * Shared Layout
 * @constructor
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
        <main className="flex flex-1 gap-6 container mx-auto px-4 py-6">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
}
