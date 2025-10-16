/**
 * Shared Footer
 * @constructor
 */
export default function Footer() {
  return (
    <footer className="border-t py-6 mt-auto"> {/* mt-auto pushes footer to bottom if content is short */}
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LanguageShop. All rights reserved.</p>
      </div>
    </footer>
  );
}