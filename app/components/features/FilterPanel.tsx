import { useFilterStore } from "~/stores/useFilterStore";
import { useProductStore } from "~/stores/useProductStore";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["black", "white", "gray", "navy", "red", "multicolor"];

/**
 * Filter Panel
 * @constructor
 */
export function FilterPanel() {
  const {
    category,
    priceRange,
    sizes,
    colors,
    inStock,
    searchQuery,
    setCategory,
    setPriceRange,
    toggleSize,
    toggleColor,
    setInStock,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  const { products } = useProductStore();

  // Dynamic category extraction
  const availableCategories = useMemo(() => {
    const allCategories = new Set<string>();
    if (Array.isArray(products)) {
      products.forEach((p) => allCategories.add(p.category));
    }
    return Array.from(allCategories).sort();
  }, [products]);

  // Dynamic color extraction
  const availableColors = useMemo(() => {
    const allColors = new Set<string>();
    if (Array.isArray(products)) {
      products.forEach((p) =>
        p.variants.forEach((v) => v.color && allColors.add(v.color)),
      );
    }
    return Array.from(allColors).sort();
  }, [products]);

  return (
    <div className="sticky top-4 space-y-6 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="e.g. black hoodie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <div className="space-y-1">
          {availableCategories.map((catId) => {
            const label = catId
              .replace("-", " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            return (
              <div key={catId} className="flex items-center">
                <Checkbox
                  id={`cat-${catId}`}
                  checked={category === catId}
                  onCheckedChange={() =>
                    setCategory(category === catId ? null : catId)
                  }
                />
                <Label htmlFor={`cat-${catId}`} className="ml-2 cursor-pointer">
                  {label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>
          Price: ${priceRange.min} – ${priceRange.max}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            max="200"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            className="w-20"
          />
          <span>–</span>
          <Input
            type="number"
            min="0"
            max="200"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-20"
          />
        </div>
      </div>

      {/* In Stock Only */}
      <div className="flex items-center">
        <Checkbox
          id="in-stock"
          checked={inStock}
          onCheckedChange={(checked) => setInStock(checked === true)}
        />
        <Label htmlFor="in-stock" className="ml-2 cursor-pointer">
          In stock only
        </Label>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <Label>Sizes</Label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <Button
              key={size}
              variant={sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label>Colors</Label>
        <div className="flex flex-wrap gap-2">
          {(availableColors.length > 0 ? availableColors : COLORS).map(
            (color) => (
              <Button
                key={color}
                variant={colors.includes(color) ? "default" : "outline"}
                size="sm"
                className="capitalize"
                onClick={() => toggleColor(color)}
              >
                {color}
              </Button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
