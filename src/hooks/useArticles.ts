import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Article } from '@/types/database';

// Données de démonstration
const demoArticles: Article[] = [
  {
    id: '1',
    title: 'Les bienfaits de la vitamine D en hiver',
    slug: 'bienfaits-vitamine-d-hiver',
    excerpt: 'Découvrez pourquoi la vitamine D est essentielle pendant les mois d\'hiver et comment maintenir des niveaux optimaux.',
    content: `
# Les bienfaits de la vitamine D en hiver

La vitamine D, souvent appelée "vitamine du soleil", joue un rôle crucial dans notre santé, particulièrement pendant les mois d'hiver.

## Pourquoi avons-nous besoin de vitamine D ?

La vitamine D est essentielle pour :
- L'absorption du calcium et la santé osseuse
- Le bon fonctionnement du système immunitaire
- La régulation de l'humeur
- La santé musculaire

## Comment maintenir des niveaux optimaux ?

1. **Exposition au soleil** : Même en hiver, essayez de vous exposer au soleil 15-20 minutes par jour
2. **Alimentation** : Consommez des poissons gras, des œufs et des produits enrichis
3. **Supplémentation** : Demandez conseil à votre pharmacien pour une supplémentation adaptée

N'hésitez pas à consulter notre équipe pour un conseil personnalisé !
    `,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop',
    author: 'Dr. Marie Dupont',
    category: 'Santé',
    tags: ['vitamine D', 'hiver', 'immunité', 'santé'],
    is_published: true,
    published_at: '2025-01-15T10:00:00Z',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Comment bien préparer sa trousse à pharmacie pour les vacances',
    slug: 'trousse-pharmacie-vacances',
    excerpt: 'Les indispensables à emporter pour des vacances sereines, que ce soit à la mer, à la montagne ou à l\'étranger.',
    content: `
# Comment bien préparer sa trousse à pharmacie pour les vacances

Partir en vacances serein, c'est aussi anticiper les petits bobos du quotidien.

## Les indispensables

- Antiseptique et pansements
- Antidouleurs (paracétamol)
- Antidiarrhéique
- Crème solaire SPF 50+
- Répulsif anti-moustiques
- Sérum physiologique

## Selon votre destination

### À la mer
- After-sun
- Gouttes auriculaires
- Protection solaire waterproof

### À la montagne
- Crème pour les lèvres
- Protection solaire indice élevé
- Médicament contre le mal des transports

Passez nous voir avant votre départ pour constituer votre trousse personnalisée !
    `,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
    author: 'Pharmacie Maurin',
    category: 'Conseils',
    tags: ['vacances', 'trousse', 'voyage', 'prévention'],
    is_published: true,
    published_at: '2025-01-10T14:00:00Z',
    created_at: '2025-01-08T10:00:00Z',
    updated_at: '2025-01-10T14:00:00Z',
  },
  {
    id: '3',
    title: 'Allergies printanières : nos conseils pour les soulager',
    slug: 'allergies-printanieres-conseils',
    excerpt: 'Le printemps arrive avec son lot de pollens. Découvrez nos conseils pour mieux vivre cette période.',
    content: `
# Allergies printanières : nos conseils pour les soulager

Le retour des beaux jours rime souvent avec le retour des allergies saisonnières.

## Comprendre l'allergie au pollen

L'allergie au pollen, ou rhume des foins, touche de plus en plus de personnes chaque année. Les symptômes incluent :
- Éternuements répétés
- Nez qui coule ou bouché
- Yeux rouges et larmoyants
- Fatigue

## Nos conseils au quotidien

1. Aérez votre logement tôt le matin ou tard le soir
2. Lavez-vous les cheveux le soir avant de vous coucher
3. Portez des lunettes de soleil à l'extérieur
4. Évitez de faire sécher le linge dehors
5. Consultez le calendrier pollinique

## Les traitements disponibles

Antihistaminiques, sprays nasaux, collyres... notre équipe est là pour vous conseiller le traitement le plus adapté à vos symptômes.
    `,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=400&fit=crop',
    author: 'Dr. Pierre Martin',
    category: 'Santé',
    tags: ['allergie', 'pollen', 'printemps', 'antihistaminique'],
    is_published: true,
    published_at: '2025-01-05T09:00:00Z',
    created_at: '2025-01-03T10:00:00Z',
    updated_at: '2025-01-05T09:00:00Z',
  },
  {
    id: '4',
    title: 'Soins naturels pour bébé : notre sélection',
    slug: 'soins-naturels-bebe',
    excerpt: 'Découvrez notre sélection de produits naturels et bio pour prendre soin de la peau délicate de votre bébé.',
    content: `
# Soins naturels pour bébé : notre sélection

La peau de bébé est fragile et mérite une attention toute particulière.

## Pourquoi choisir des soins naturels ?

- Moins de risques d'allergies
- Respect de la peau sensible
- Ingrédients d'origine naturelle
- Meilleur pour l'environnement

## Notre sélection

### Pour le change
- Liniment oléo-calcaire bio
- Lingettes à l'eau
- Crème protectrice au calendula

### Pour le bain
- Gel lavant surgras bio
- Huile de massage naturelle

### Pour l'hydratation
- Crème visage et corps bio
- Baume réparateur

Venez découvrir notre rayon bébé et bénéficiez de conseils personnalisés !
    `,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop',
    author: 'Pharmacie Maurin',
    category: 'Bébé & Maman',
    tags: ['bébé', 'naturel', 'bio', 'soins'],
    is_published: true,
    published_at: '2025-01-01T11:00:00Z',
    created_at: '2024-12-28T10:00:00Z',
    updated_at: '2025-01-01T11:00:00Z',
  },
];

export const useArticles = (options?: {
  category?: string;
  limit?: number;
  published?: boolean;
}) => {
  return useQuery({
    queryKey: ['articles', options],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        let filtered = [...demoArticles];
        
        if (options?.published !== false) {
          filtered = filtered.filter(a => a.is_published);
        }
        if (options?.category) {
          filtered = filtered.filter(a => a.category === options.category);
        }
        if (options?.limit) {
          filtered = filtered.slice(0, options.limit);
        }
        
        return filtered;
      }

      let query = supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (options?.published !== false) {
        query = query.eq('is_published', true);
      }
      if (options?.category) {
        query = query.eq('category', options.category);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Article[];
    },
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return demoArticles.find(a => a.slug === slug) || null;
      }

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug,
  });
};

export const useLatestArticles = (limit: number = 4) => {
  return useArticles({ limit, published: true });
};
