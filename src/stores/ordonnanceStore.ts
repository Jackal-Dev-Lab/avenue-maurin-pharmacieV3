import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type OrdonnanceStatus = 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';

export interface Ordonnance {
  id: string;
  user_id?: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  doctor_name?: string;
  notes?: string;
  image_urls: string[];
  status: OrdonnanceStatus;
  pickup_date?: string;
  created_at: string;
  updated_at: string;
}

interface OrdonnanceState {
  ordonnances: Ordonnance[];
  currentOrdonnance: Ordonnance | null;
  isLoading: boolean;
  
  // Actions
  fetchUserOrdonnances: (userId: string) => Promise<void>;
  createOrdonnance: (data: Omit<Ordonnance, 'id' | 'status' | 'created_at' | 'updated_at'>) => Promise<{ id?: string; error?: string }>;
  getOrdonnance: (id: string) => Promise<void>;
  cancelOrdonnance: (id: string) => Promise<{ error?: string }>;
}

// Données démo
const demoOrdonnances: Ordonnance[] = [
  {
    id: 'ord-001',
    patient_name: 'Jean Dupont',
    patient_email: 'jean.dupont@email.com',
    patient_phone: '06 12 34 56 78',
    doctor_name: 'Dr. Martin',
    status: 'ready',
    image_urls: [],
    pickup_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ord-002',
    patient_name: 'Jean Dupont',
    patient_email: 'jean.dupont@email.com',
    patient_phone: '06 12 34 56 78',
    status: 'completed',
    image_urls: [],
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date(Date.now() - 518400000).toISOString(),
  },
];

export const useOrdonnanceStore = create<OrdonnanceState>()((set, get) => ({
  ordonnances: [],
  currentOrdonnance: null,
  isLoading: false,

  fetchUserOrdonnances: async (userId) => {
    set({ isLoading: true });

    if (!isSupabaseConfigured()) {
      // Mode démo
      set({ ordonnances: demoOrdonnances, isLoading: false });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ordonnances')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ ordonnances: data || [], isLoading: false });
    } catch (e) {
      console.error('Error fetching ordonnances:', e);
      set({ isLoading: false });
    }
  },

  createOrdonnance: async (data) => {
    if (!isSupabaseConfigured()) {
      // Mode démo
      const newOrdonnance: Ordonnance = {
        ...data,
        id: 'ord-' + Date.now(),
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      set((state) => ({
        ordonnances: [newOrdonnance, ...state.ordonnances],
      }));
      return { id: newOrdonnance.id };
    }

    try {
      const { data: newOrdonnance, error } = await supabase
        .from('ordonnances')
        .insert({
          ...data,
          status: 'pending',
        })
        .select()
        .single();

      if (error) return { error: error.message };

      set((state) => ({
        ordonnances: [newOrdonnance, ...state.ordonnances],
      }));

      return { id: newOrdonnance.id };
    } catch (e) {
      return { error: 'Une erreur est survenue' };
    }
  },

  getOrdonnance: async (id) => {
    set({ isLoading: true });

    if (!isSupabaseConfigured()) {
      const ordonnance = demoOrdonnances.find((o) => o.id === id);
      set({ currentOrdonnance: ordonnance || null, isLoading: false });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ordonnances')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      set({ currentOrdonnance: data, isLoading: false });
    } catch (e) {
      console.error('Error fetching ordonnance:', e);
      set({ currentOrdonnance: null, isLoading: false });
    }
  },

  cancelOrdonnance: async (id) => {
    if (!isSupabaseConfigured()) {
      set((state) => ({
        ordonnances: state.ordonnances.map((o) =>
          o.id === id ? { ...o, status: 'cancelled' as OrdonnanceStatus } : o
        ),
      }));
      return {};
    }

    try {
      const { error } = await supabase
        .from('ordonnances')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) return { error: error.message };

      set((state) => ({
        ordonnances: state.ordonnances.map((o) =>
          o.id === id ? { ...o, status: 'cancelled' as OrdonnanceStatus } : o
        ),
      }));

      return {};
    } catch (e) {
      return { error: 'Une erreur est survenue' };
    }
  },
}));
