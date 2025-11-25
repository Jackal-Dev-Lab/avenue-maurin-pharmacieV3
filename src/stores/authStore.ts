import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    zip?: string;
  };
  created_at?: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  
  // Auth methods
  signUp: (email: string, password: string, profile?: Partial<UserProfile>) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  
  // Initialize auth state
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),

      signUp: async (email, password, profileData) => {
        if (!isSupabaseConfigured()) {
          // Mode démo - simuler une inscription
          const demoUser = {
            id: 'demo-' + Date.now(),
            email,
            created_at: new Date().toISOString(),
          };
          const demoProfile: UserProfile = {
            id: demoUser.id,
            email,
            first_name: profileData?.first_name || '',
            last_name: profileData?.last_name || '',
            phone: profileData?.phone || '',
            created_at: demoUser.created_at,
          };
          set({ user: demoUser as User, profile: demoProfile, isAuthenticated: true });
          return {};
        }

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) return { error: error.message };

          if (data.user) {
            // Créer le profil utilisateur
            const { error: profileError } = await supabase
              .from('user_profiles')
              .insert({
                id: data.user.id,
                email,
                first_name: profileData?.first_name || '',
                last_name: profileData?.last_name || '',
                phone: profileData?.phone || '',
              });

            if (profileError) console.error('Error creating profile:', profileError);
          }

          return {};
        } catch (e) {
          return { error: 'Une erreur est survenue' };
        }
      },

      signIn: async (email, password) => {
        if (!isSupabaseConfigured()) {
          // Mode démo
          const demoUser = {
            id: 'demo-user',
            email,
            created_at: new Date().toISOString(),
          };
          const demoProfile: UserProfile = {
            id: demoUser.id,
            email,
            first_name: 'Jean',
            last_name: 'Dupont',
            phone: '06 12 34 56 78',
            created_at: demoUser.created_at,
          };
          set({ user: demoUser as User, profile: demoProfile, isAuthenticated: true });
          return {};
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) return { error: error.message };

          if (data.user) {
            // Récupérer le profil
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            set({ user: data.user, profile, isAuthenticated: true });
          }

          return {};
        } catch (e) {
          return { error: 'Une erreur est survenue' };
        }
      },

      signOut: async () => {
        if (isSupabaseConfigured()) {
          await supabase.auth.signOut();
        }
        set({ user: null, profile: null, isAuthenticated: false });
      },

      updateProfile: async (profileData) => {
        const { user } = get();
        if (!user) return { error: 'Non connecté' };

        if (!isSupabaseConfigured()) {
          // Mode démo
          set((state) => ({
            profile: state.profile ? { ...state.profile, ...profileData } : null,
          }));
          return {};
        }

        try {
          const { error } = await supabase
            .from('user_profiles')
            .update(profileData)
            .eq('id', user.id);

          if (error) return { error: error.message };

          set((state) => ({
            profile: state.profile ? { ...state.profile, ...profileData } : null,
          }));

          return {};
        } catch (e) {
          return { error: 'Une erreur est survenue' };
        }
      },

      resetPassword: async (email) => {
        if (!isSupabaseConfigured()) {
          return {};
        }

        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });

          if (error) return { error: error.message };
          return {};
        } catch (e) {
          return { error: 'Une erreur est survenue' };
        }
      },

      initialize: async () => {
        set({ isLoading: true });

        if (!isSupabaseConfigured()) {
          set({ isLoading: false });
          return;
        }

        try {
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({
              user: session.user,
              profile,
              isAuthenticated: true,
            });
          }
        } catch (e) {
          console.error('Error initializing auth:', e);
        }

        set({ isLoading: false });

        // Écouter les changements d'auth
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({
              user: session.user,
              profile,
              isAuthenticated: true,
            });
          } else {
            set({ user: null, profile: null, isAuthenticated: false });
          }
        });
      },
    }),
    {
      name: 'pharmacie-maurin-auth',
      partialize: (state) => ({
        // Ne pas persister user et profile pour la sécurité
      }),
    }
  )
);
