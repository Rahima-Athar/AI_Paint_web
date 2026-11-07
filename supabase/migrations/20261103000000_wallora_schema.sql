-- =============================================================================
-- WALLORA AI: DATABASE SCHEMA & ROW LEVEL SECURITY POLICIES
-- Target: Supabase (PostgreSQL 15+)
-- Specification: Wallora AI Master Brief (Section 7)
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. PROFILES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =============================================================================
-- 2. PROJECTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Room Design',
    room_type TEXT NOT NULL CHECK (room_type IN ('Living Room', 'Master Bedroom', 'Dining Room', 'Kitchen', 'Study', 'Other')),
    mood TEXT CHECK (mood IN ('Calm', 'Cozy', 'Luxury', 'Modern')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'uploaded', 'processing', 'completed', 'failed')),
    original_image_path TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =============================================================================
-- 3. DESIGN VARIANTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.design_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    color_name TEXT NOT NULL,
    color_hex TEXT NOT NULL CHECK (color_hex ~* '^#[A-Fa-f0-9]{6}$'),
    finish TEXT DEFAULT 'Eggshell' CHECK (finish IN ('Matte', 'Eggshell', 'Satin', 'Semi-Gloss')),
    lighting_mode TEXT DEFAULT 'morning' CHECK (lighting_mode IN ('morning', 'evening', 'neutral')),
    result_image_path TEXT,
    provider TEXT NOT NULL DEFAULT 'demo' CHECK (provider IN ('demo', 'replicate', 'stability', 'fal')),
    generation_status TEXT NOT NULL DEFAULT 'processing' CHECK (generation_status IN ('processing', 'completed', 'failed')),
    error_code TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =============================================================================
-- 4. PALETTES & PALETTE COLORS TABLES (Curated & Publicly Readable)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.palettes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    mood TEXT NOT NULL CHECK (mood IN ('Calm', 'Cozy', 'Luxury', 'Modern')),
    category TEXT NOT NULL CHECK (category IN ('Warm', 'Cool', 'Neutral', 'Pastel', 'Bold')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.palette_colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    palette_id UUID NOT NULL REFERENCES public.palettes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    hex TEXT NOT NULL CHECK (hex ~* '^#[A-Fa-f0-9]{6}$'),
    lrv INTEGER CHECK (lrv >= 0 AND lrv <= 100),
    undertone TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =============================================================================
-- 5. FAVORITES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES public.design_variants(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, variant_id)
);

-- =============================================================================
-- 6. PERFORMANCE INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON public.projects(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_variants_project_id ON public.design_variants(project_id);
CREATE INDEX IF NOT EXISTS idx_variants_user_id ON public.design_variants(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_palette_colors_palette_id ON public.palette_colors(palette_id);

-- =============================================================================
-- 7. AUTOMATIC TIMESTAMP TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_projects_updated_at ON public.projects;
CREATE TRIGGER trigger_set_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Users only read, insert, update, delete their own data
-- =============================================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.palette_colors ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Projects Policies
CREATE POLICY "Users can view own projects"
    ON public.projects FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
    ON public.projects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
    ON public.projects FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
    ON public.projects FOR DELETE
    USING (auth.uid() = user_id);

-- Design Variants Policies
CREATE POLICY "Users can view own design variants"
    ON public.design_variants FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own design variants"
    ON public.design_variants FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own design variants"
    ON public.design_variants FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own design variants"
    ON public.design_variants FOR DELETE
    USING (auth.uid() = user_id);

-- Favorites Policies
CREATE POLICY "Users can view own favorites"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

-- Palettes Policies (Publicly readable, trusted admin write)
CREATE POLICY "Public read active palettes"
    ON public.palettes FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Public read palette colors"
    ON public.palette_colors FOR SELECT
    USING (TRUE);

-- =============================================================================
-- 9. SUPABASE STORAGE BUCKETS & OBJECT ACCESS POLICIES
-- =============================================================================
-- Note: Buckets can be created via Supabase Dashboard or SQL as below:
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('room-originals', 'room-originals', false),
    ('design-variants', 'design-variants', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Users can only upload & read their own files (user_id/* path convention)
CREATE POLICY "Users can upload original room images to own folder"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'room-originals' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can read own room original images"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'room-originals' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own room original images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'room-originals' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can read own generated design variants"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'design-variants' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- =============================================================================
-- 10. SEED DATA: CURATED LAVENDER DREAM & ARCHITECTURAL PALETTES
-- =============================================================================
DO $$
DECLARE
    p_lavender UUID := uuid_generate_v4();
    p_nordic UUID := uuid_generate_v4();
    p_emerald UUID := uuid_generate_v4();
    p_cashmere UUID := uuid_generate_v4();
BEGIN
    -- 1. Lavender Dream
    INSERT INTO public.palettes (id, name, mood, category, is_active)
    VALUES (p_lavender, 'Lavender Dream Collection', 'Luxury', 'Pastel', true);

    INSERT INTO public.palette_colors (palette_id, name, hex, lrv, undertone, sort_order) VALUES
    (p_lavender, 'Royal Lavender', '#74608F', 28, 'Cool Plum', 1),
    (p_lavender, 'Soft Lilac', '#B7A1CF', 52, 'Silken Violet', 2),
    (p_lavender, 'Dusty Rose', '#D9B8CE', 61, 'Warm Blush', 3),
    (p_lavender, 'Blush Pink', '#E9D9E9', 78, 'Luminous Pearl', 4),
    (p_lavender, 'Soft Gold Accent', '#C3A77D', 47, 'Brushed Brass', 5);

    -- 2. Nordic Tranquility
    INSERT INTO public.palettes (id, name, mood, category, is_active)
    VALUES (p_nordic, 'Nordic Tranquility', 'Calm', 'Cool', true);

    INSERT INTO public.palette_colors (palette_id, name, hex, lrv, undertone, sort_order) VALUES
    (p_nordic, 'Fjord Slate', '#5E6F74', 25, 'Nordic Blue-Grey', 1),
    (p_nordic, 'Morning Mist', '#98A8A9', 49, 'Frosted Mineral', 2),
    (p_nordic, 'Glacier Silk', '#C7D1D0', 68, 'Silver Ice', 3),
    (p_nordic, 'Arctic Chalk', '#EBF0EF', 88, 'Pure Alabaster', 4);

    -- 3. Emerald Estate
    INSERT INTO public.palettes (id, name, mood, category, is_active)
    VALUES (p_emerald, 'Emerald Estate & Forest Hues', 'Modern', 'Bold', true);

    INSERT INTO public.palette_colors (palette_id, name, hex, lrv, undertone, sort_order) VALUES
    (p_emerald, 'Imperial Emerald', '#283E38', 14, 'Deep Pine', 1),
    (p_emerald, 'Deep Sage', '#4A655C', 31, 'Earthy Botanical', 2),
    (p_emerald, 'Eucalyptus Mist', '#8FA59B', 55, 'Silver Sage', 3),
    (p_emerald, 'Pale Lichen', '#DCE4DF', 80, 'Muted Celadon', 4);

    -- 4. Warm Cashmere
    INSERT INTO public.palettes (id, name, mood, category, is_active)
    VALUES (p_cashmere, 'Warm Cashmere & Terracotta', 'Cozy', 'Warm', true);

    INSERT INTO public.palette_colors (palette_id, name, hex, lrv, undertone, sort_order) VALUES
    (p_cashmere, 'Tuscan Ochre', '#C68B59', 36, 'Sunbaked Terracotta', 1),
    (p_cashmere, 'Warm Cashmere', '#D8C6B6', 63, 'Velvet Camel', 2),
    (p_cashmere, 'Almond Plaster', '#EFE7DC', 81, 'Warm Biscuit', 3),
    (p_cashmere, 'Espresso Velvet', '#3C2F2F', 11, 'Dark Mocha', 4);
END $$;

-- =============================================================================
-- 11. AVATARS STORAGE BUCKET (Public read for profile pictures)
-- =============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar images are publicly readable"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatars' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

