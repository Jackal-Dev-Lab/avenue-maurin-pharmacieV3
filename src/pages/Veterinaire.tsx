import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilters } from "@/components/CategoryFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const brands = [
  "Frontline",
  "Advantage",
  "Seresto",
  "Clément Thékan",
  "Virbac",
  "Effipro",
];

const categories = [
  "Antiparasitaires",
  "Hygiène",
  "Compléments",
  "Vermifuges",
  "Accessoires",
];

const Veterinaire = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const { data: products, isLoading } = useProducts({ 
    categoryId: 'veterinaire',
    brand: selectedBrand 
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Vétérinaire"
        description="Soins et produits pour vos animaux de compagnie. Antiparasitaires, hygiène, compléments alimentaires."
        image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=400&fit=crop"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategoryFilters 
              brands={brands} 
              categories={categories}
              onBrandChange={setSelectedBrand}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{products?.length || 0}</span> produits
                </p>
                <Select defaultValue="popularity">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularité</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name">Nom A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
              ) : products && products.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      name={product.name}
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucun produit trouvé</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Veterinaire;
