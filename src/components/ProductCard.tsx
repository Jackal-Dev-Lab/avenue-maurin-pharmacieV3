import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  name: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

export const ProductCard = ({
  id,
  name,
  slug,
  price,
  originalPrice,
  discount,
  image,
  rating = 4.5,
  reviews = 0,
  inStock = true,
}: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) return;

    addItem({
      id: id || name.toLowerCase().replace(/\s+/g, '-'),
      name,
      price,
      originalPrice,
      image,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const cardContent = (
    <>
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
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
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
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className="text-xl font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>

        <Button 
          className="w-full" 
          size="sm" 
          disabled={!inStock}
          onClick={handleAddToCart}
          variant={isAdded ? "secondary" : "default"}
        >
          {isAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Ajouté
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inStock ? "Ajouter" : "Indisponible"}
            </>
          )}
        </Button>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link 
        to={`/produit/${slug}`}
        className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all border border-border group block"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all border border-border group">
      {cardContent}
    </div>
  );
};
