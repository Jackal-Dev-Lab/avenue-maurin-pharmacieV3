import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdvancedSearch } from "@/hooks/useSearch";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  { id: "pharmacie", label: "Pharmacie" },
  { id: "parapharmacie", label: "Parapharmacie" },
  { id: "bebe-maman", label: "Bébé & Maman" },
  { id: "veterinaire", label: "Vétérinaire" },
];

const Recherche = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { query, setQuery, results, isLoading } = useAdvancedSearch({
    category: selectedCategory,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    inStock: inStockOnly || undefined,
  });

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery, setQuery]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setSearchParams(newQuery ? { q: newQuery } : {});
  };

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange([0, 100]);
    setInStockOnly(false);
  };

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 100 || inStockOnly;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Catégories */}
      <div>
        <h3 className="font-medium mb-3">Catégories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={cat.id}
                checked={selectedCategory === cat.id}
                onCheckedChange={(checked) => 
                  setSelectedCategory(checked ? cat.id : undefined)
                }
              />
              <Label htmlFor={cat.id} className="cursor-pointer">
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <h3 className="font-medium mb-3">Prix</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={5}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} €</span>
            <span>{priceRange[1]} €</span>
          </div>
        </div>
      </div>

      {/* En stock */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <Label htmlFor="inStock" className="cursor-pointer">
            En stock uniquement
          </Label>
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Effacer les filtres
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Recherche</h1>
          <SearchBar
            className="max-w-2xl"
            placeholder="Rechercher un produit..."
          />
        </div>

        <div className="flex gap-8">
          {/* Filtres desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filtres</h2>
              <FiltersContent />
            </div>
          </aside>

          {/* Résultats */}
          <div className="flex-1">
            {/* Mobile filters button */}
            <div className="lg:hidden mb-4">
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filtres
                    {hasActiveFilters && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {query ? (
                  <>
                    <span className="font-semibold text-foreground">{results.length}</span> résultat
                    {results.length > 1 ? "s" : ""} pour "{query}"
                  </>
                ) : (
                  "Entrez un terme de recherche"
                )}
              </p>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    originalPrice={product.original_price || undefined}
                    discount={product.discount || undefined}
                    image={product.image}
                    rating={product.rating}
                    reviews={product.reviews_count}
                    inStock={product.in_stock}
                  />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Aucun résultat</h2>
                <p className="text-muted-foreground mb-6">
                  Aucun produit ne correspond à votre recherche "{query}"
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Suggestions :</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    <li>Vérifiez l'orthographe</li>
                    <li>Essayez des termes plus généraux</li>
                    <li>Réduisez le nombre de filtres</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Recherchez un produit</h2>
                <p className="text-muted-foreground">
                  Utilisez la barre de recherche ci-dessus pour trouver des produits
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recherche;
