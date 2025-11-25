import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Product } from '@/types/database';
import { debounce } from '@/lib/utils';

// Données de démo pour la recherche
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Doliprane 1000mg - 8 comprimés',
    slug: 'doliprane-1000mg',
    description: 'Médicament contre la douleur et la fièvre',
    price: 2.95,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    images: [],
    rating: 4.8,
    reviews_count: 245,
    in_stock: true,
    stock_quantity: 100,
    category_id: 'pharmacie',
    brand: 'Doliprane',
    is_featured: true,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Humex Rhume - 16 comprimés',
    slug: 'humex-rhume',
    description: 'Soulage les symptômes du rhume',
    price: 6.50,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    images: [],
    rating: 4.5,
    reviews_count: 123,
    in_stock: true,
    stock_quantity: 50,
    category_id: 'pharmacie',
    brand: 'Humex',
    is_featured: false,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Gaviscon Menthe - 24 comprimés',
    slug: 'gaviscon-menthe',
    description: 'Soulage les brûlures d\'estomac et remontées acides',
    price: 5.90,
    original_price: 7.20,
    discount: '-18%',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    images: [],
    rating: 4.6,
    reviews_count: 89,
    in_stock: true,
    stock_quantity: 75,
    category_id: 'pharmacie',
    brand: 'Gaviscon',
    is_featured: false,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'La Roche-Posay Anthelios SPF50+ - 50ml',
    slug: 'la-roche-posay-anthelios',
    description: 'Protection solaire très haute protection',
    price: 21.99,
    original_price: 28.99,
    discount: '-24%',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    images: [],
    rating: 4.9,
    reviews_count: 567,
    in_stock: true,
    stock_quantity: 40,
    category_id: 'parapharmacie',
    brand: 'La Roche-Posay',
    is_featured: true,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Bioderma Sensibio H2O - 500ml',
    slug: 'bioderma-sensibio',
    description: 'Eau micellaire démaquillante peaux sensibles',
    price: 11.99,
    original_price: 15.99,
    discount: '-25%',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
    images: [],
    rating: 4.9,
    reviews_count: 823,
    in_stock: true,
    stock_quantity: 60,
    category_id: 'parapharmacie',
    brand: 'Bioderma',
    is_featured: true,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Mustela Hydra Bébé Crème Visage - 40ml',
    slug: 'mustela-hydra-bebe',
    description: 'Crème hydratante visage pour bébé',
    price: 7.90,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    images: [],
    rating: 4.8,
    reviews_count: 234,
    in_stock: true,
    stock_quantity: 45,
    category_id: 'bebe-maman',
    brand: 'Mustela',
    is_featured: false,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Frontline Combo Chat - 6 pipettes',
    slug: 'frontline-combo-chat',
    description: 'Antiparasitaire pour chat',
    price: 32.90,
    original_price: 39.90,
    discount: '-18%',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop',
    images: [],
    rating: 4.8,
    reviews_count: 423,
    in_stock: true,
    stock_quantity: 30,
    category_id: 'veterinaire',
    brand: 'Frontline',
    is_featured: true,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Spasfon 160mg - 30 comprimés',
    slug: 'spasfon-160mg',
    description: 'Antispasmodique',
    price: 8.90,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
    images: [],
    rating: 4.7,
    reviews_count: 156,
    in_stock: true,
    stock_quantity: 80,
    category_id: 'pharmacie',
    brand: 'Spasfon',
    is_featured: false,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

interface SearchOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  limit?: number;
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Debounce la recherche
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 300),
    []
  );

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  }, [debouncedSetQuery]);

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return [];
      }

      if (!isSupabaseConfigured()) {
        // Recherche locale dans les données de démo
        const searchLower = debouncedQuery.toLowerCase();
        return demoProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description?.toLowerCase().includes(searchLower) ||
            product.brand?.toLowerCase().includes(searchLower)
        );
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${debouncedQuery}%,description.ilike.%${debouncedQuery}%,brand.ilike.%${debouncedQuery}%`)
        .limit(10);

      if (error) throw error;
      return data as Product[];
    },
    enabled: debouncedQuery.length >= 2,
  });

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    results: results || [],
    isLoading,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
    clearSearch,
  };
};

export const useAdvancedSearch = (options?: SearchOptions) => {
  const [query, setQuery] = useState('');

  const { data: results, isLoading } = useQuery({
    queryKey: ['advanced-search', query, options],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        let filtered = [...demoProducts];

        if (query && query.length >= 2) {
          const searchLower = query.toLowerCase();
          filtered = filtered.filter(
            (product) =>
              product.name.toLowerCase().includes(searchLower) ||
              product.description?.toLowerCase().includes(searchLower) ||
              product.brand?.toLowerCase().includes(searchLower)
          );
        }

        if (options?.category) {
          filtered = filtered.filter((p) => p.category_id === options.category);
        }

        if (options?.minPrice !== undefined) {
          filtered = filtered.filter((p) => p.price >= options.minPrice!);
        }

        if (options?.maxPrice !== undefined) {
          filtered = filtered.filter((p) => p.price <= options.maxPrice!);
        }

        if (options?.inStock) {
          filtered = filtered.filter((p) => p.in_stock);
        }

        if (options?.limit) {
          filtered = filtered.slice(0, options.limit);
        }

        return filtered;
      }

      let queryBuilder = supabase.from('products').select('*');

      if (query && query.length >= 2) {
        queryBuilder = queryBuilder.or(
          `name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`
        );
      }

      if (options?.category) {
        queryBuilder = queryBuilder.eq('category_id', options.category);
      }

      if (options?.minPrice !== undefined) {
        queryBuilder = queryBuilder.gte('price', options.minPrice);
      }

      if (options?.maxPrice !== undefined) {
        queryBuilder = queryBuilder.lte('price', options.maxPrice);
      }

      if (options?.inStock) {
        queryBuilder = queryBuilder.eq('in_stock', true);
      }

      if (options?.limit) {
        queryBuilder = queryBuilder.limit(options.limit);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;
      return data as Product[];
    },
  });

  return {
    query,
    setQuery,
    results: results || [],
    isLoading,
  };
};

// Suggestions de recherche populaires
export const useSearchSuggestions = () => {
  return useQuery({
    queryKey: ['search-suggestions'],
    queryFn: async () => {
      // Retourner des suggestions statiques ou depuis la BDD
      return [
        'Doliprane',
        'Rhume',
        'Solaire',
        'Bébé',
        'Anti-douleur',
        'Vitamines',
        'Allergie',
        'Digestion',
      ];
    },
    staleTime: 1000 * 60 * 60, // 1 heure
  });
};
