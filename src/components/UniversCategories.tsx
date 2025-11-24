import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Pharmacie",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&h=400&fit=crop",
    description: "Médicaments, hygiène et soins de santé",
    link: "/pharmacie",
  },
  {
    name: "Parapharmacie",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=400&fit=crop",
    description: "Beauté, cosmétiques et bien-être",
    link: "/parapharmacie",
  },
  {
    name: "Bébé & Maman",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop",
    description: "Produits pour bébés et futures mamans",
    link: "/bebe-maman",
  },
  {
    name: "Vétérinaire",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop",
    description: "Soins et produits pour vos animaux",
    link: "/veterinaire",
  },
];

export const UniversCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Découvrez nos univers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un large choix de produits pour toute la famille
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.link}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-hover transition-all border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                  Découvrir
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
