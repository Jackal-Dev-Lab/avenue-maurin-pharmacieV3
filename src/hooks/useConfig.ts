import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { NavigationItem, SiteConfig } from '@/types/database';

// Configuration de démonstration
const demoNavigation: NavigationItem[] = [
  {
    id: '1',
    name: 'Pharmacie',
    slug: 'pharmacie',
    link: '/pharmacie',
    parent_id: null,
    order: 1,
    is_visible: true,
    icon: 'pill',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Parapharmacie',
    slug: 'parapharmacie',
    link: '/parapharmacie',
    parent_id: null,
    order: 2,
    is_visible: true,
    icon: 'sparkles',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Bébé & Maman',
    slug: 'bebe-maman',
    link: '/bebe-maman',
    parent_id: null,
    order: 3,
    is_visible: true,
    icon: 'baby',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Vétérinaire',
    slug: 'veterinaire',
    link: '/veterinaire',
    parent_id: null,
    order: 4,
    is_visible: true,
    icon: 'paw-print',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Promotions',
    slug: 'promotions',
    link: '/promotions',
    parent_id: null,
    order: 5,
    is_visible: true,
    icon: 'percent',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Blog',
    slug: 'blog',
    link: '/blog',
    parent_id: null,
    order: 6,
    is_visible: true,
    icon: 'newspaper',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const demoSiteConfig: Record<string, SiteConfig> = {
  'site_name': {
    id: '1',
    key: 'site_name',
    value: 'Pharmacie Maurin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'site_description': {
    id: '2',
    key: 'site_description',
    value: 'Votre pharmacie en ligne à Montpellier',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'contact_phone': {
    id: '3',
    key: 'contact_phone',
    value: '04 67 27 75 55',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'contact_email': {
    id: '4',
    key: 'contact_email',
    value: 'contact@pharmacie-maurin.fr',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'address': {
    id: '5',
    key: 'address',
    value: {
      street: '1479 Avenue de Maurin',
      city: 'Montpellier',
      zip: '34070',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'opening_hours': {
    id: '6',
    key: 'opening_hours',
    value: {
      monday: '9h - 19h30',
      tuesday: '9h - 19h30',
      wednesday: '9h - 19h30',
      thursday: '9h - 19h30',
      friday: '9h - 19h30',
      saturday: '9h - 19h30',
      sunday: 'Fermé',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'features': {
    id: '7',
    key: 'features',
    value: {
      click_collect: true,
      ordonnance: true,
      blog: true,
      promotions: true,
      veterinaire: true,
      bebe_maman: true,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export const useNavigation = () => {
  return useQuery({
    queryKey: ['navigation'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return demoNavigation.filter(item => item.is_visible).sort((a, b) => a.order - b.order);
      }

      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('is_visible', true)
        .order('order', { ascending: true });
      
      if (error) throw error;
      return data as NavigationItem[];
    },
  });
};

export const useSiteConfig = (key?: string) => {
  return useQuery({
    queryKey: ['site_config', key],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        if (key) {
          return demoSiteConfig[key] || null;
        }
        return Object.values(demoSiteConfig);
      }

      if (key) {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .eq('key', key)
          .single();
        
        if (error) throw error;
        return data as SiteConfig;
      }

      const { data, error } = await supabase
        .from('site_config')
        .select('*');
      
      if (error) throw error;
      return data as SiteConfig[];
    },
  });
};

export const useFeatures = () => {
  return useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return demoSiteConfig['features']?.value as Record<string, boolean>;
      }

      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .eq('key', 'features')
        .single();
      
      if (error) throw error;
      return data?.value as Record<string, boolean>;
    },
  });
};

// Hook pour vérifier si une fonctionnalité est activée
export const useFeature = (featureName: string) => {
  const { data: features, isLoading } = useFeatures();
  return {
    isEnabled: features?.[featureName] ?? true,
    isLoading,
  };
};
