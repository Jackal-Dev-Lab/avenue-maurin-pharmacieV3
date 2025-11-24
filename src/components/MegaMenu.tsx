import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation, useFeatures } from "@/hooks/useConfig";
import { Link } from "react-router-dom";

interface MegaMenuProps {
  isOpen?: boolean;
}

// Configuration par défaut des sous-catégories (statique pour l'instant, pourrait être en BDD)
const defaultSubcategories: Record<string, { title: string; items: string[] }[]> = {
  "pharmacie": [
    { title: "Médicaments", items: ["Douleur & Fièvre", "Rhume & Grippe", "Troubles digestifs", "Allergie"] },
    { title: "Hygiène & Soins", items: ["Hygiène bucco-dentaire", "Premiers secours", "Désinfection"] },
    { title: "Santé", items: ["Sommeil", "Stress", "Circulation", "Articulations"] },
  ],
  "parapharmacie": [
    { title: "Visage", items: ["Anti-âge", "Hydratation", "Nettoyage", "Solaire"] },
    { title: "Corps", items: ["Hydratation corps", "Minceur", "Jambes lourdes", "Solaire corps"] },
    { title: "Cheveux", items: ["Shampoings", "Soins", "Colorations", "Anti-chute"] },
  ],
  "bebe-maman": [
    { title: "Bébé", items: ["Toilette & change", "Alimentation", "Puériculture", "Santé bébé"] },
    { title: "Maman", items: ["Grossesse", "Allaitement", "Post-partum"] },
  ],
  "veterinaire": [
    { title: "Chien", items: ["Antiparasitaires", "Hygiène", "Compléments", "Accessoires"] },
    { title: "Chat", items: ["Antiparasitaires", "Hygiène", "Compléments", "Accessoires"] },
  ],
};

// Catégories qui n'ont pas de sous-menu
const simpleLinks = ["promotions", "blog"];

export const MegaMenu = ({ isOpen }: MegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data: navigationItems, isLoading } = useNavigation();
  const { data: features } = useFeatures();

  // Filtrer les éléments de navigation en fonction des features activées
  const filteredNavItems = navigationItems?.filter(item => {
    const featureMap: Record<string, string> = {
      'veterinaire': 'veterinaire',
      'bebe-maman': 'bebe_maman',
      'promotions': 'promotions',
      'blog': 'blog',
    };
    
    const featureKey = featureMap[item.slug];
    if (featureKey && features) {
      return features[featureKey] !== false;
    }
    return true;
  });

  if (isLoading) {
    return (
      <nav className="border-t border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-1 py-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-1 py-3 flex-wrap">
          {filteredNavItems?.map((item) => {
            const hasSubcategories = defaultSubcategories[item.slug] && !simpleLinks.includes(item.slug);
            
            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => hasSubcategories && setActiveCategory(item.slug)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {!hasSubcategories ? (
                  <Link
                    to={item.link || `/${item.slug}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <Link
                      to={item.link || `/${item.slug}`}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent"
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Link>

                    {/* Mega menu dropdown */}
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 top-full mt-2 w-screen max-w-4xl bg-card border border-border rounded-xl shadow-hover p-6 transition-all duration-200 z-50",
                        activeCategory === item.slug
                          ? "opacity-100 visible"
                          : "opacity-0 invisible pointer-events-none"
                      )}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {defaultSubcategories[item.slug]?.map((subcat) => (
                          <div key={subcat.title}>
                            <h3 className="font-semibold text-foreground mb-3 text-sm">
                              {subcat.title}
                            </h3>
                            <ul className="space-y-2">
                              {subcat.items.map((subItem) => (
                                <li key={subItem}>
                                  <Link
                                    to={`/${item.slug}?category=${encodeURIComponent(subItem)}`}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
