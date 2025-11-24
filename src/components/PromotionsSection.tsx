import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

const promotions = [
  {
    name: "La Roche-Posay Anthelios",
    originalPrice: 28.99,
    price: 21.99,
    discount: "-24%",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
  },
  {
    name: "Nuxe Huile Prodigieuse",
    originalPrice: 18.50,
    price: 14.90,
    discount: "-19%",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
  },
  {
    name: "Avène Eau Thermale",
    originalPrice: 12.90,
    price: 9.99,
    discount: "-23%",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
  },
  {
    name: "Bioderma Sensibio H2O",
    originalPrice: 15.99,
    price: 11.99,
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop",
  },
];

export const PromotionsSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Promotions du moment
            </h2>
            <p className="text-muted-foreground">
              Profitez de nos meilleures offres
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <a href="/promotions">Voir toutes les promos</a>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((product) => (
            <div
              key={product.name}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all border border-border group"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Badge className="absolute top-3 right-3 bg-promo text-white z-10">
                  {product.discount}
                </Badge>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-3 line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {product.price.toFixed(2)} €
                  </span>
                </div>
                <Button className="w-full" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <a href="/promotions">Voir toutes les promos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
