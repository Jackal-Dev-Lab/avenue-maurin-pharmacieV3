export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Configuration du site
      site_config: {
        Row: {
          id: string
          key: string
          value: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          created_at?: string
          updated_at?: string
        }
      }
      // Configuration de la navigation
      navigation_items: {
        Row: {
          id: string
          name: string
          slug: string
          link: string | null
          parent_id: string | null
          order: number
          is_visible: boolean
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          link?: string | null
          parent_id?: string | null
          order?: number
          is_visible?: boolean
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          link?: string | null
          parent_id?: string | null
          order?: number
          is_visible?: boolean
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Catégories de produits
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image: string | null
          parent_id: string | null
          order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // Produits
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          original_price: number | null
          discount: string | null
          image: string
          images: string[]
          rating: number
          reviews_count: number
          in_stock: boolean
          stock_quantity: number
          category_id: string | null
          brand: string | null
          is_featured: boolean
          is_promotion: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          original_price?: number | null
          discount?: string | null
          image: string
          images?: string[]
          rating?: number
          reviews_count?: number
          in_stock?: boolean
          stock_quantity?: number
          category_id?: string | null
          brand?: string | null
          is_featured?: boolean
          is_promotion?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          original_price?: number | null
          discount?: string | null
          image?: string
          images?: string[]
          rating?: number
          reviews_count?: number
          in_stock?: boolean
          stock_quantity?: number
          category_id?: string | null
          brand?: string | null
          is_featured?: boolean
          is_promotion?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // Articles de blog / Actualités
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          image: string | null
          author: string | null
          category: string | null
          tags: string[]
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          image?: string | null
          author?: string | null
          category?: string | null
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          image?: string | null
          author?: string | null
          category?: string | null
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Pages statiques (mentions légales, CGV, etc.)
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          meta_description: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          meta_description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          meta_description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // FAQ
      faq_items: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // Marques
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          logo: string | null
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo?: string | null
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo?: string | null
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // Promotions/Bannières
      promotions: {
        Row: {
          id: string
          title: string
          description: string | null
          image: string | null
          link: string | null
          discount_code: string | null
          discount_percent: number | null
          start_date: string | null
          end_date: string | null
          is_active: boolean
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image?: string | null
          link?: string | null
          discount_code?: string | null
          discount_percent?: number | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image?: string | null
          link?: string | null
          discount_code?: string | null
          discount_percent?: number | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Types utilitaires
export type SiteConfig = Database['public']['Tables']['site_config']['Row'];
export type NavigationItem = Database['public']['Tables']['navigation_items']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Page = Database['public']['Tables']['pages']['Row'];
export type FAQItem = Database['public']['Tables']['faq_items']['Row'];
export type Brand = Database['public']['Tables']['brands']['Row'];
export type Promotion = Database['public']['Tables']['promotions']['Row'];

// Types pour insertion
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
