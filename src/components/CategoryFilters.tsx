import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

interface CategoryFiltersProps {
  brands?: string[];
  categories?: string[];
  onBrandChange?: (brand: string | undefined) => void;
  onCategoryChange?: (category: string | undefined) => void;
  onPriceChange?: (min: number, max: number) => void;
  onPromoChange?: (promo: boolean) => void;
}

export const CategoryFilters = ({ 
  brands = [], 
  categories = [],
  onBrandChange,
  onCategoryChange,
  onPriceChange,
  onPromoChange,
}: CategoryFiltersProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [promoOnly, setPromoOnly] = useState(false);

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrand = checked ? brand : undefined;
    setSelectedBrand(newBrand);
    onBrandChange?.(newBrand);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategory = checked ? category : undefined;
    setSelectedCategory(newCategory);
    onCategoryChange?.(newCategory);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onPriceChange?.(value[0], value[1]);
  };

  const handlePromoChange = (checked: boolean) => {
    setPromoOnly(checked);
    onPromoChange?.(checked);
  };

  const handleReset = () => {
    setSelectedBrand(undefined);
    setSelectedCategory(undefined);
    setPriceRange([0, 100]);
    setPromoOnly(false);
    onBrandChange?.(undefined);
    onCategoryChange?.(undefined);
    onPriceChange?.(0, 100);
    onPromoChange?.(false);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Filtres</h3>
          <Button variant="ghost" size="sm" className="text-primary" onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>

        <Accordion type="multiple" defaultValue={["price", "brands", "categories"]} className="space-y-4">
          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              Prix
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider 
                  value={priceRange} 
                  onValueChange={handlePriceChange}
                  max={100} 
                  step={1} 
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]} €</span>
                  <span>{priceRange[1]}+ €</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {brands.length > 0 && (
            <AccordionItem value="brands" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Marques
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`}
                        checked={selectedBrand === brand}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <Label
                        htmlFor={`brand-${brand}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {categories.length > 0 && (
            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Catégories
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`cat-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label
                        htmlFor={`cat-${category}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="promo" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              Offres
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="promo"
                    checked={promoOnly}
                    onCheckedChange={(checked) => handlePromoChange(checked as boolean)}
                  />
                  <Label htmlFor="promo" className="text-sm font-normal cursor-pointer">
                    En promotion
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="new" />
                  <Label htmlFor="new" className="text-sm font-normal cursor-pointer">
                    Nouveautés
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};
