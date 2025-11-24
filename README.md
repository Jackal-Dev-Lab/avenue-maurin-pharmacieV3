# Pharmacie Maurin - Site Web

Site web de la Pharmacie Maurin avec gestion de contenu via Supabase.

## Fonctionnalités

- 🏪 **Pages produits** : Pharmacie, Parapharmacie, Bébé & Maman, Vétérinaire
- 🎯 **Promotions** : Page dédiée avec filtres dynamiques
- 📝 **Blog** : Articles et conseils santé
- 📄 **Pages légales** : CGV, Mentions légales, Politique de confidentialité
- ❓ **FAQ** : Questions fréquentes avec catégories
- 🛒 **Click & Collect** : Commande en ligne, retrait en pharmacie
- 📋 **Ordonnance en ligne** : Envoi d'ordonnance simplifié
- ⚙️ **Configuration Supabase** : Tout est configurable via la base de données

## Technologies

- **Frontend** : React, TypeScript, Vite
- **UI** : Tailwind CSS, shadcn/ui
- **Backend** : Supabase (PostgreSQL)
- **State** : TanStack Query

## Installation

### 1. Cloner le projet

```bash
git clone <YOUR_GIT_URL>
cd maurin-health-hub
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration Supabase (optionnel)

L'application fonctionne avec des données de démonstration par défaut. Pour utiliser Supabase :

1. Créez un projet sur [Supabase](https://app.supabase.com)
2. Exécutez le script SQL dans `supabase/schema.sql` via l'éditeur SQL de Supabase
3. Copiez `.env.example` vers `.env` et remplissez vos credentials :

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

## Structure du projet

```
src/
├── components/     # Composants réutilisables
├── hooks/          # Hooks personnalisés (useProducts, useArticles, etc.)
├── lib/            # Utilitaires et client Supabase
├── pages/          # Pages de l'application
└── types/          # Types TypeScript

supabase/
└── schema.sql      # Schéma de la base de données
```

## Configuration via Supabase

### Tables disponibles

| Table | Description |
|-------|-------------|
| `site_config` | Configuration générale du site |
| `navigation_items` | Éléments de navigation (afficher/masquer les onglets) |
| `products` | Catalogue de produits |
| `articles` | Articles de blog |
| `pages` | Pages statiques (CGV, mentions légales, etc.) |
| `faq_items` | Questions fréquentes |
| `categories` | Catégories de produits |
| `brands` | Marques |
| `promotions` | Bannières promotionnelles |

### Activer/Désactiver des fonctionnalités

Dans la table `site_config`, modifiez l'entrée `features` :

```json
{
  "click_collect": true,
  "ordonnance": true,
  "blog": true,
  "promotions": true,
  "veterinaire": true,
  "bebe_maman": true
}
```

Mettez `false` pour désactiver une fonctionnalité.

### Masquer un onglet de navigation

Dans la table `navigation_items`, passez `is_visible` à `false` pour l'élément concerné.

## Déploiement

### Via Lovable

Ouvrez [Lovable](https://lovable.dev/projects/269ac265-304a-4be5-be58-36d8061cae23) et cliquez sur Share → Publish.

### Build manuel

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

## Licence

Propriétaire - Pharmacie Maurin
