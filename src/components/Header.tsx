import { useState, useEffect } from "react";
import { Search, ShoppingCart, Phone, User, Menu, X, LogOut, Package, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./MegaMenu";
import { SearchBar, SearchModal } from "./SearchBar";
import { CartDrawer } from "./CartDrawer";
import { AuthModal } from "./AuthModal";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { openCart, getTotalItems } = useCartStore();
  const { isAuthenticated, profile, signOut, initialize } = useAuthStore();
  
  const cartItemCount = getTotalItems();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
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
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                <span className="text-2xl">⚕️</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-foreground">Pharmacie Maurin</h1>
                <p className="text-xs text-muted-foreground">Votre santé en ligne</p>
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <SearchBar className="w-full" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {profile?.first_name} {profile?.last_name}
                        </span>
                        <span className="text-xs text-muted-foreground font-normal">
                          {profile?.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/mon-compte" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Mon compte
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/mes-commandes" className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        Mes commandes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/mes-ordonnances" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Mes ordonnances
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Button>

              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu content */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              {!isAuthenticated ? (
                <Button
                  className="w-full mb-4"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Connexion / Inscription
                </Button>
              ) : (
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Bonjour, {profile?.first_name} !
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to="/mon-compte">Mon compte</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <MegaMenu isOpen={isMenuOpen} />
      </header>

      {/* Modals et Drawers */}
      <CartDrawer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
