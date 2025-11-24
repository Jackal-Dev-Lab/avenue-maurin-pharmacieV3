import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Product } from '@/types/database';

// Données de démonstration
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
    description: 'Soulage les brûlures d\'estomac',
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
    stock_quantity: 60,
    category_id: 'pharmacie',
    brand: 'Spasfon',
    is_featured: true,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Crème Hydratante Visage - 50ml',
    slug: 'creme-hydratante-visage',
    description: 'Hydratation intense pour le visage',
    price: 15.90,
    original_price: 19.90,
    discount: '-20%',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    images: [],
    rating: 4.9,
    reviews_count: 312,
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
    id: '6',
    name: 'Sérum Anti-Âge - 30ml',
    slug: 'serum-anti-age',
    description: 'Sérum concentré anti-rides',
    price: 29.90,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    images: [],
    rating: 4.7,
    reviews_count: 89,
    in_stock: true,
    stock_quantity: 25,
    category_id: 'parapharmacie',
    brand: 'Vichy',
    is_featured: false,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Couches Pampers Taille 3 - 50 unités',
    slug: 'couches-pampers-t3',
    description: 'Couches ultra-absorbantes',
    price: 14.90,
    original_price: 18.90,
    discount: '-21%',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    images: [],
    rating: 4.8,
    reviews_count: 456,
    in_stock: true,
    stock_quantity: 80,
    category_id: 'bebe-maman',
    brand: 'Pampers',
    is_featured: true,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Lait Infantile 1er Âge - 800g',
    slug: 'lait-infantile-1er-age',
    description: 'Lait pour nourrisson de 0 à 6 mois',
    price: 18.50,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    images: [],
    rating: 4.6,
    reviews_count: 234,
    in_stock: true,
    stock_quantity: 45,
    category_id: 'bebe-maman',
    brand: 'Gallia',
    is_featured: false,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Frontline Spot-On Chien - 3 pipettes',
    slug: 'frontline-spot-on-chien',
    description: 'Antiparasitaire pour chien',
    price: 24.90,
    original_price: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    images: [],
    rating: 4.7,
    reviews_count: 178,
    in_stock: true,
    stock_quantity: 35,
    category_id: 'veterinaire',
    brand: 'Frontline',
    is_featured: true,
    is_promotion: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Advantix Chien Moyen - 4 pipettes',
    slug: 'advantix-chien-moyen',
    description: 'Protection contre puces et tiques',
    price: 32.90,
    original_price: 38.90,
    discount: '-15%',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
    images: [],
    rating: 4.8,
    reviews_count: 145,
    in_stock: true,
    stock_quantity: 28,
    category_id: 'veterinaire',
    brand: 'Advantix',
    is_featured: false,
    is_promotion: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useProducts = (options?: {
  categoryId?: string;
  featured?: boolean;
  promotion?: boolean;
  limit?: number;
  brand?: string;
}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        // Utiliser les données de démo
        let filtered = [...demoProducts];
        
        if (options?.categoryId) {
          filtered = filtered.filter(p => p.category_id === options.categoryId);
        }
        if (options?.featured) {
          filtered = filtered.filter(p => p.is_featured);
        }
        if (options?.promotion) {
          filtered = filtered.filter(p => p.is_promotion);
        }
        if (options?.brand) {
          filtered = filtered.filter(p => p.brand === options.brand);
        }
        if (options?.limit) {
          filtered = filtered.slice(0, options.limit);
        }
        
        return filtered;
      }

      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
      }
      if (options?.featured) {
        query = query.eq('is_featured', true);
      }
      if (options?.promotion) {
        query = query.eq('is_promotion', true);
      }
      if (options?.brand) {
        query = query.eq('brand', options.brand);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return demoProducts.find(p => p.slug === slug) || null;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Product;
    },
    enabled: !!slug,
  });
};

export const useProductsByCategory = (categorySlug: string) => {
  return useProducts({ categoryId: categorySlug });
};

export const useFeaturedProducts = (limit?: number) => {
  return useProducts({ featured: true, limit });
};

export const usePromotionProducts = (limit?: number) => {
  return useProducts({ promotion: true, limit });
};
