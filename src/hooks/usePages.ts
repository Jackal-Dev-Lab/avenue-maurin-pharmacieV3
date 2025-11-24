import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Page } from '@/types/database';

// Pages de démonstration
const demoPages: Record<string, Page> = {
  'about': {
    id: '1',
    title: 'Qui sommes-nous',
    slug: 'about',
    content: `
# Pharmacie Maurin - Votre pharmacie de confiance à Montpellier

## Notre histoire

Depuis plus de 30 ans, la Pharmacie Maurin est au service de la santé des Montpelliérains. Située au cœur du quartier de Maurin, notre officine est devenue un véritable lieu de référence pour les habitants du quartier et au-delà.

## Notre équipe

Notre équipe est composée de **pharmaciens diplômés** et d'**assistants qualifiés**, tous passionnés par leur métier et dévoués à votre bien-être. Nous mettons un point d'honneur à vous accueillir avec le sourire et à vous offrir des conseils personnalisés.

### Dr. Jean Maurin - Pharmacien titulaire
Fort de 30 ans d'expérience, le Dr. Maurin dirige l'officine avec passion et professionnalisme.

### Dr. Marie Dupont - Pharmacien adjoint
Spécialisée en dermocosmétique et nutrition, Marie vous accompagne dans vos choix de soins.

### L'équipe de préparateurs
Nos préparateurs certifiés assurent la préparation de vos ordonnances avec rigueur et précision.

## Nos valeurs

- **Proximité** : Un accueil chaleureux et personnalisé
- **Expertise** : Des conseils pharmaceutiques de qualité
- **Accessibilité** : Des prix justes et des services adaptés
- **Innovation** : Des outils modernes pour votre confort (Click & Collect, envoi d'ordonnance)

## Nos engagements

✓ Conseils personnalisés par nos pharmaciens
✓ Large gamme de produits de santé et de parapharmacie
✓ Service Click & Collect en 20 minutes
✓ Gestion de vos ordonnances en ligne
✓ Prix compétitifs et promotions régulières

## Nous contacter

N'hésitez pas à nous rendre visite ou à nous appeler pour tout renseignement !
    `,
    meta_description: 'Découvrez l\'histoire et l\'équipe de la Pharmacie Maurin à Montpellier. Plus de 30 ans au service de votre santé.',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'legal': {
    id: '2',
    title: 'Mentions légales',
    slug: 'legal',
    content: `
# Mentions légales

## Éditeur du site

**Pharmacie Maurin**
1479 Avenue de Maurin
34070 Montpellier
France

Téléphone : 04 67 27 75 55
Email : contact@pharmacie-maurin.fr

**Pharmacien titulaire** : Dr. Jean Maurin
**Numéro RPPS** : XXXXXXXXX
**Numéro d'inscription à l'Ordre** : XXXXX

## Hébergement

Le site est hébergé par :
[Nom de l'hébergeur]
[Adresse de l'hébergeur]

## Propriété intellectuelle

L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de la Pharmacie Maurin ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable.

## Données personnelles

Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.

Pour exercer ce droit, contactez-nous à : contact@pharmacie-maurin.fr

## Responsabilité

Les informations contenues sur ce site sont données à titre indicatif et ne sauraient se substituer à une consultation médicale ou pharmaceutique.

## Autorité de contrôle

**Agence Régionale de Santé Occitanie**
L'activité de la Pharmacie Maurin est soumise au contrôle de l'ARS Occitanie.

**Ordre National des Pharmaciens**
www.ordre.pharmacien.fr
    `,
    meta_description: 'Mentions légales de la Pharmacie Maurin - Informations juridiques et réglementaires.',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'cgv': {
    id: '3',
    title: 'Conditions Générales de Vente',
    slug: 'cgv',
    content: `
# Conditions Générales de Vente

*Dernière mise à jour : Janvier 2025*

## Article 1 - Objet

Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits effectuées par la Pharmacie Maurin, que ce soit en officine ou via le service Click & Collect.

## Article 2 - Produits

Les produits proposés à la vente sont ceux présentés sur le site ou en officine. La Pharmacie Maurin se réserve le droit de modifier à tout moment son assortiment.

### 2.1 Médicaments
Les médicaments sans ordonnance sont disponibles à la vente. Les médicaments sur ordonnance ne peuvent être délivrés que sur présentation d'une ordonnance valide.

### 2.2 Parapharmacie
Les produits de parapharmacie, hygiène, beauté et bien-être sont disponibles sans prescription.

## Article 3 - Prix

Les prix sont indiqués en euros TTC. La Pharmacie Maurin se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix facturé sera celui en vigueur au moment de la commande.

## Article 4 - Click & Collect

### 4.1 Commande
Le client peut réserver des produits en ligne pour retrait en pharmacie dans un délai de 20 minutes à 48 heures selon les produits.

### 4.2 Retrait
Le retrait s'effectue en pharmacie sur présentation de la confirmation de commande et d'une pièce d'identité.

### 4.3 Paiement
Le paiement s'effectue au moment du retrait en pharmacie.

## Article 5 - Droit de rétractation

Conformément à la législation en vigueur, les médicaments ne peuvent faire l'objet d'un droit de rétractation. Pour les produits de parapharmacie, un délai de 14 jours est accordé.

## Article 6 - Garanties

La Pharmacie Maurin garantit la conformité des produits vendus. En cas de défaut constaté, le client peut demander l'échange ou le remboursement du produit.

## Article 7 - Protection des données

Les données collectées sont traitées conformément à notre Politique de Confidentialité et au RGPD.

## Article 8 - Litiges

En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux de Montpellier seront compétents.
    `,
    meta_description: 'Conditions Générales de Vente de la Pharmacie Maurin - Modalités d\'achat et de retrait en pharmacie.',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'privacy': {
    id: '4',
    title: 'Politique de confidentialité',
    slug: 'privacy',
    content: `
# Politique de Confidentialité

*Dernière mise à jour : Janvier 2025*

La Pharmacie Maurin s'engage à protéger la vie privée de ses clients et utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.

## 1. Responsable du traitement

**Pharmacie Maurin**
1479 Avenue de Maurin
34070 Montpellier
Email : contact@pharmacie-maurin.fr

## 2. Données collectées

Nous collectons les données suivantes :

### Données d'identification
- Nom et prénom
- Adresse email
- Numéro de téléphone
- Adresse postale

### Données de santé (le cas échéant)
- Ordonnances médicales
- Historique d'achats de médicaments

### Données de navigation
- Adresse IP
- Cookies

## 3. Finalités du traitement

Vos données sont utilisées pour :
- La gestion de vos commandes Click & Collect
- Le traitement de vos ordonnances
- L'envoi d'informations sur nos services (avec votre consentement)
- L'amélioration de nos services

## 4. Base légale

Le traitement de vos données est fondé sur :
- L'exécution du contrat (commandes)
- Vos obligations légales (données de santé)
- Votre consentement (newsletter)

## 5. Durée de conservation

- Données clients : 3 ans après le dernier achat
- Données de santé : conformément aux obligations légales
- Cookies : 13 mois maximum

## 6. Vos droits

Conformément au RGPD, vous disposez des droits suivants :
- **Droit d'accès** : obtenir une copie de vos données
- **Droit de rectification** : corriger vos données
- **Droit à l'effacement** : demander la suppression de vos données
- **Droit d'opposition** : vous opposer au traitement de vos données
- **Droit à la portabilité** : recevoir vos données dans un format structuré

Pour exercer ces droits : contact@pharmacie-maurin.fr

## 7. Sécurité

Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé.

## 8. Cookies

Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.

## 9. Contact

Pour toute question concernant cette politique, contactez-nous à : contact@pharmacie-maurin.fr
    `,
    meta_description: 'Politique de confidentialité de la Pharmacie Maurin - Protection de vos données personnelles et RGPD.',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export const usePage = (slug: string) => {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return demoPages[slug] || null;
      }

      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as Page;
    },
    enabled: !!slug,
  });
};

export const usePages = () => {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return Object.values(demoPages);
      }

      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('is_published', true);
      
      if (error) throw error;
      return data as Page[];
    },
  });
};
