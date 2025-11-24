import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { usePromotionProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const Promotions = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const { data: products, isLoading } = usePromotionProducts();

  const filters = [
    { id: 'all', label: 'Toutes les promos' },
    { id: 'high', label: '-20% et plus' },
    { id: 'parapharmacie', label: 'Parapharmacie' },
    { id: 'pharmacie', label: 'Pharmacie' },
    { id: 'bebe', label: 'Bébé' },
  ];

  // Filtrer les produits selon le filtre sélectionné
  const filteredProducts = products?.filter(product => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'high') {
      const discountNum = product.discount ? parseInt(product.discount.replace(/[^0-9]/g, '')) : 0;
      return discountNum >= 20;
    }
    if (selectedFilter === 'parapharmacie') return product.category_id === 'parapharmacie';
    if (selectedFilter === 'pharmacie') return product.category_id === 'pharmacie';
    if (selectedFilter === 'bebe') return product.category_id === 'bebe-maman';
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Promotions"
        description="Les meilleures offres du moment sur une large sélection de produits. Profitez-en vite !"
        image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-8">
            {filters.map(filter => (
              <Badge 
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"} 
                className="text-base px-4 py-2 cursor-pointer"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts?.length || 0}</span> produits en promotion
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
              <p className="text-muted-foreground">Aucune promotion disponible pour le moment</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Promotions;
