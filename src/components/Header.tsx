import { Search, ShoppingCart, Phone, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar with trust signals */}
      <div className="bg-accent border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm text-accent-foreground">
            <div className="flex items-center gap-4">
              <span className="font-medium">✓ Pharmacie française certifiée</span>
              <span className="hidden md:inline">✓ Conseils pharmaceutiques</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <a href="tel:0467277555" className="font-medium hover:underline">
                04 67 27 75 55
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <span className="text-2xl">⚕️</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">Pharmacie Maurin</h1>
              <p className="text-xs text-muted-foreground">Votre santé en ligne</p>
            </div>
          </a>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un produit, une marque, un symptôme..."
                className="pl-10 pr-4 py-6 rounded-full border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-6 rounded-full border-2 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <MegaMenu isOpen={isMenuOpen} />
    </header>
  );
};
