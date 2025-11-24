-- =====================================================
-- SCHEMA SUPABASE POUR PHARMACIE MAURIN
-- =====================================================

-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: site_config
-- Configuration générale du site
-- =====================================================
CREATE TABLE IF NOT EXISTS public.site_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_config_updated_at
    BEFORE UPDATE ON site_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: navigation_items
-- Éléments de navigation du site
-- =====================================================
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    link VARCHAR(255),
    parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
    "order" INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    icon VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_navigation_items_updated_at
    BEFORE UPDATE ON navigation_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: categories
-- Catégories de produits
-- =====================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    "order" INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: products
-- Produits
-- =====================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount VARCHAR(50),
    image VARCHAR(500) NOT NULL,
    images TEXT[] DEFAULT '{}',
    rating DECIMAL(2, 1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    category_id VARCHAR(255),
    brand VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    is_promotion BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Index pour les recherches fréquentes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_is_promotion ON products(is_promotion);
CREATE INDEX idx_products_in_stock ON products(in_stock);

-- =====================================================
-- TABLE: articles
-- Articles de blog
-- =====================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image VARCHAR(500),
    author VARCHAR(255),
    category VARCHAR(255),
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_articles_is_published ON articles(is_published);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);

-- =====================================================
-- TABLE: pages
-- Pages statiques (CGV, mentions légales, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: faq_items
-- Questions fréquentes
-- =====================================================
CREATE TABLE IF NOT EXISTS public.faq_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255),
    "order" INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_faq_items_updated_at
    BEFORE UPDATE ON faq_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: brands
-- Marques
-- =====================================================
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo VARCHAR(500),
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: promotions
-- Promotions et bannières
-- =====================================================
CREATE TABLE IF NOT EXISTS public.promotions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    link VARCHAR(500),
    discount_code VARCHAR(50),
    discount_percent INTEGER,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TRIGGER update_promotions_updated_at
    BEFORE UPDATE ON promotions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONNÉES INITIALES
-- =====================================================

-- Configuration du site
INSERT INTO site_config (key, value) VALUES
('site_name', '"Pharmacie Maurin"'),
('site_description', '"Votre pharmacie en ligne à Montpellier"'),
('contact_phone', '"04 67 27 75 55"'),
('contact_email', '"contact@pharmacie-maurin.fr"'),
('address', '{"street": "1479 Avenue de Maurin", "city": "Montpellier", "zip": "34070"}'),
('opening_hours', '{"monday": "9h - 19h30", "tuesday": "9h - 19h30", "wednesday": "9h - 19h30", "thursday": "9h - 19h30", "friday": "9h - 19h30", "saturday": "9h - 19h30", "sunday": "Fermé"}'),
('features', '{"click_collect": true, "ordonnance": true, "blog": true, "promotions": true, "veterinaire": true, "bebe_maman": true}')
ON CONFLICT (key) DO NOTHING;

-- Navigation
INSERT INTO navigation_items (name, slug, link, "order", is_visible, icon) VALUES
('Pharmacie', 'pharmacie', '/pharmacie', 1, true, 'pill'),
('Parapharmacie', 'parapharmacie', '/parapharmacie', 2, true, 'sparkles'),
('Bébé & Maman', 'bebe-maman', '/bebe-maman', 3, true, 'baby'),
('Vétérinaire', 'veterinaire', '/veterinaire', 4, true, 'paw-print'),
('Promotions', 'promotions', '/promotions', 5, true, 'percent'),
('Blog', 'blog', '/blog', 6, true, 'newspaper')
ON CONFLICT (slug) DO NOTHING;

-- Catégories
INSERT INTO categories (name, slug, "order", is_visible) VALUES
('Pharmacie', 'pharmacie', 1, true),
('Parapharmacie', 'parapharmacie', 2, true),
('Bébé & Maman', 'bebe-maman', 3, true),
('Vétérinaire', 'veterinaire', 4, true)
ON CONFLICT (slug) DO NOTHING;

-- Pages statiques
INSERT INTO pages (title, slug, content, meta_description, is_published) VALUES
('Qui sommes-nous', 'about', '# Pharmacie Maurin

Votre pharmacie de confiance à Montpellier depuis plus de 30 ans.

## Notre équipe

Une équipe de professionnels à votre service.

## Nos valeurs

- Proximité
- Expertise  
- Accessibilité
- Innovation', 'Découvrez l''histoire et l''équipe de la Pharmacie Maurin à Montpellier.', true),

('Mentions légales', 'legal', '# Mentions légales

## Éditeur du site

Pharmacie Maurin
1479 Avenue de Maurin
34070 Montpellier

Téléphone : 04 67 27 75 55
Email : contact@pharmacie-maurin.fr', 'Mentions légales de la Pharmacie Maurin.', true),

('Conditions Générales de Vente', 'cgv', '# Conditions Générales de Vente

## Article 1 - Objet

Les présentes CGV régissent les ventes de produits effectuées par la Pharmacie Maurin.

## Article 2 - Produits

Les produits proposés sont ceux présentés sur le site ou en officine.', 'Conditions Générales de Vente de la Pharmacie Maurin.', true),

('Politique de confidentialité', 'privacy', '# Politique de Confidentialité

## 1. Responsable du traitement

Pharmacie Maurin
1479 Avenue de Maurin
34070 Montpellier

## 2. Données collectées

Nous collectons uniquement les données nécessaires à la gestion de vos commandes.', 'Politique de confidentialité de la Pharmacie Maurin.', true)
ON CONFLICT (slug) DO NOTHING;

-- FAQ
INSERT INTO faq_items (question, answer, category, "order", is_visible) VALUES
('Comment fonctionne le service Click & Collect ?', 'Sélectionnez vos produits sur notre site, choisissez l''option Click & Collect et validez votre commande. Vous recevrez un email de confirmation dès que votre commande sera prête (généralement sous 20 minutes).', 'Click & Collect', 1, true),
('Quels sont les délais de préparation ?', 'Votre commande est généralement prête en 20 minutes pendant les heures d''ouverture de la pharmacie.', 'Click & Collect', 2, true),
('Comment envoyer mon ordonnance en ligne ?', 'Rendez-vous sur notre page "Ordonnance en ligne", prenez une photo claire de votre ordonnance et remplissez le formulaire. Notre équipe vous contactera dans les plus brefs délais.', 'Ordonnance', 3, true),
('Quels sont vos horaires d''ouverture ?', 'La pharmacie est ouverte du lundi au samedi de 9h à 19h30. Nous sommes fermés le dimanche et les jours fériés.', 'Général', 4, true),
('Proposez-vous des conseils personnalisés ?', 'Absolument ! Notre équipe de pharmaciens est à votre disposition pour vous conseiller, que ce soit en pharmacie, par téléphone ou par email.', 'Conseil', 5, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- POLITIQUES RLS (Row Level Security)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique pour toutes les tables
CREATE POLICY "Allow public read access" ON site_config FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON navigation_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON pages FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON promotions FOR SELECT USING (true);

-- Note: Pour l'administration, vous pouvez créer des politiques supplémentaires
-- basées sur l'authentification Supabase (auth.uid()) pour permettre les modifications
