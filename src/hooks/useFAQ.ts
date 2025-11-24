import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { FAQItem } from '@/types/database';

// FAQ de démonstration
const demoFAQ: FAQItem[] = [
  {
    id: '1',
    question: 'Comment fonctionne le service Click & Collect ?',
    answer: 'C\'est très simple ! Sélectionnez vos produits sur notre site, choisissez l\'option Click & Collect et validez votre commande. Vous recevrez un email de confirmation dès que votre commande sera prête (généralement sous 20 minutes). Présentez-vous ensuite en pharmacie avec votre confirmation et une pièce d\'identité pour récupérer vos produits.',
    category: 'Click & Collect',
    order: 1,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    question: 'Quels sont les délais de préparation pour le Click & Collect ?',
    answer: 'Votre commande est généralement prête en 20 minutes pendant les heures d\'ouverture de la pharmacie. Pour les commandes passées en dehors des horaires d\'ouverture, votre commande sera prête dès l\'ouverture de la pharmacie le jour suivant.',
    category: 'Click & Collect',
    order: 2,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    question: 'Comment envoyer mon ordonnance en ligne ?',
    answer: 'Rendez-vous sur notre page "Ordonnance en ligne", prenez une photo claire de votre ordonnance (recto et verso si nécessaire), remplissez le formulaire avec vos coordonnées et envoyez. Notre équipe vous contactera dans les plus brefs délais pour vous indiquer quand vos médicaments seront prêts.',
    category: 'Ordonnance',
    order: 3,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    question: 'Puis-je me faire livrer mes médicaments à domicile ?',
    answer: 'Actuellement, nous proposons uniquement le retrait en pharmacie (Click & Collect). Cependant, pour les personnes à mobilité réduite ou dans l\'impossibilité de se déplacer, contactez-nous directement par téléphone pour étudier une solution adaptée à votre situation.',
    category: 'Livraison',
    order: 4,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer: 'En pharmacie, nous acceptons : carte bancaire, espèces, chèques et Carte Vitale pour les médicaments remboursables. Le paiement se fait au moment du retrait de votre commande.',
    category: 'Paiement',
    order: 5,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    question: 'Quels sont vos horaires d\'ouverture ?',
    answer: 'La pharmacie est ouverte du lundi au samedi de 9h à 19h30. Nous sommes fermés le dimanche et les jours fériés. Pour les urgences en dehors de ces horaires, consultez la liste des pharmacies de garde sur le site de l\'Ordre des Pharmaciens.',
    category: 'Général',
    order: 6,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    question: 'Comment bénéficier des promotions ?',
    answer: 'Nos promotions sont visibles directement sur notre site dans la rubrique "Promotions". Elles sont également affichées en pharmacie. Les réductions s\'appliquent automatiquement, il n\'y a pas de code à saisir.',
    category: 'Promotions',
    order: 7,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    question: 'Proposez-vous des conseils personnalisés ?',
    answer: 'Absolument ! Notre équipe de pharmaciens est à votre disposition pour vous conseiller, que ce soit en pharmacie, par téléphone au 04 67 27 75 55, ou par email. N\'hésitez pas à nous solliciter pour toute question concernant vos traitements ou votre santé.',
    category: 'Conseil',
    order: 8,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '9',
    question: 'Que faire si un produit commandé n\'est pas disponible ?',
    answer: 'Si un produit de votre commande n\'est pas disponible, nous vous contacterons immédiatement pour vous proposer une alternative ou vous informer du délai d\'approvisionnement. Vous pourrez alors choisir d\'attendre ou de modifier votre commande.',
    category: 'Click & Collect',
    order: 9,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '10',
    question: 'Proposez-vous des produits vétérinaires ?',
    answer: 'Oui, nous disposons d\'un rayon vétérinaire complet avec des antiparasitaires, des compléments alimentaires, des produits d\'hygiène et des accessoires pour vos animaux de compagnie (chiens, chats, NAC). Nos pharmaciens peuvent vous conseiller sur les produits adaptés à votre animal.',
    category: 'Vétérinaire',
    order: 10,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useFAQ = (category?: string) => {
  return useQuery({
    queryKey: ['faq', category],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        let filtered = demoFAQ.filter(item => item.is_visible);
        if (category) {
          filtered = filtered.filter(item => item.category === category);
        }
        return filtered.sort((a, b) => a.order - b.order);
      }

      let query = supabase
        .from('faq_items')
        .select('*')
        .eq('is_visible', true)
        .order('order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as FAQItem[];
    },
  });
};

export const useFAQCategories = () => {
  return useQuery({
    queryKey: ['faq_categories'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        const categories = [...new Set(demoFAQ.filter(item => item.is_visible && item.category).map(item => item.category))];
        return categories.filter(Boolean) as string[];
      }

      const { data, error } = await supabase
        .from('faq_items')
        .select('category')
        .eq('is_visible', true)
        .not('category', 'is', null);
      
      if (error) throw error;
      
      const categories = [...new Set(data.map(item => item.category))];
      return categories.filter(Boolean) as string[];
    },
  });
};
