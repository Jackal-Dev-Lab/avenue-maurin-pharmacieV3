import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  discount,
  image,
  rating = 4.5,
  reviews = 0,
  inStock = true,
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all border border-border group">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {discount && (
          <Badge className="absolute top-3 right-3 bg-promo text-white z-10">
            {discount}
          </Badge>
        )}
        {!inStock && (
          <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground z-10">
            Rupture
          </Badge>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {name}
        </h3>
        
        {reviews > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? "fill-primary text-primary"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toFixed(2)} €
            </span>
          )}
          <span className="text-xl font-bold text-primary">
            {price.toFixed(2)} €
          </span>
        </div>

        <Button className="w-full" size="sm" disabled={!inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {inStock ? "Ajouter" : "Indisponible"}
        </Button>
      </div>
    </div>
  );
};
