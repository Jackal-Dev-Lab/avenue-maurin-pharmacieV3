import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch, useSearchSuggestions } from "@/hooks/useSearch";
import { formatPrice } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

export const SearchBar = ({ 
  className, 
  placeholder = "Rechercher un produit, une marque, un symptôme...",
  onClose,
  autoFocus = false,
}: SearchBarProps) => {
  const { query, results, isLoading, handleSearch, clearSearch, isSearchOpen, setIsSearchOpen } = useSearch();
  const { data: suggestions } = useSearchSuggestions();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const showDropdown = isFocused && (query.length >= 2 || query.length === 0);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(query)}`);
      setIsFocused(false);
      onClose?.();
    }
  };

  const handleResultClick = () => {
    setIsFocused(false);
    clearSearch();
    onClose?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="pl-10 pr-10 py-6 rounded-full border-2 focus:border-primary"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => {
                clearSearch();
                inputRef.current?.focus();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown des résultats */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : query.length >= 2 && results.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-3 py-2">
                  {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/produit/${product.slug}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.brand}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-primary">
                        {formatPrice(product.price)}
                      </p>
                      {product.original_price && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.original_price)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="border-t border-border p-3">
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => {
                    navigate(`/recherche?q=${encodeURIComponent(query)}`);
                    setIsFocused(false);
                    onClose?.();
                  }}
                >
                  Voir tous les résultats
                </Button>
              </div>
            </div>
          ) : query.length >= 2 && results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Aucun résultat pour "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Essayez avec d'autres termes
              </p>
            </div>
          ) : (
            /* Suggestions quand pas de recherche */
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Recherches populaires
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions?.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Version mobile (modal plein écran)
export const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <SearchBar 
          className="flex-1" 
          autoFocus 
          onClose={onClose}
        />
        <Button variant="ghost" size="sm" onClick={onClose}>
          Annuler
        </Button>
      </div>
    </div>
  );
};
