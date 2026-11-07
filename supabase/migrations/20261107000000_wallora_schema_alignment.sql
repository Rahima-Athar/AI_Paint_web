-- Wallora AI schema alignment migration
-- Adds fields/tables used by the application while preserving existing data and RLS.

-- Profiles: app uses location/bio/preferences; keep existing columns.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Projects: app sometimes stores dimensions/notes in local payloads; safe optional columns.
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS room_width NUMERIC;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS room_height NUMERIC;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS notes TEXT;

-- Design variants: align client naming with schema. Keep canonical columns and add compatibility columns.
ALTER TABLE public.design_variants ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT FALSE;
ALTER TABLE public.design_variants ADD COLUMN IF NOT EXISTS primary_color_hex TEXT;
ALTER TABLE public.design_variants ADD COLUMN IF NOT EXISTS accent_color_hex TEXT;
ALTER TABLE public.design_variants ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.design_variants ADD COLUMN IF NOT EXISTS prompt TEXT;
ALTER TABLE public.design_variants ADD COLUMN IF NOT EXISTS result_image_url TEXT;

-- Backfill compatibility columns where canonical data exists.
UPDATE public.design_variants
SET primary_color_hex = COALESCE(primary_color_hex, color_hex)
WHERE primary_color_hex IS NULL AND color_hex IS NOT NULL;

UPDATE public.design_variants
SET result_image_url = COALESCE(result_image_url, result_image_path)
WHERE result_image_url IS NULL AND result_image_path IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_variants_is_favorite ON public.design_variants(user_id, is_favorite);

-- AI usage tracking for statistics (real data only).
CREATE TABLE IF NOT EXISTS public.ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    generation_count INTEGER NOT NULL DEFAULT 0 CHECK (generation_count >= 0),
    provider TEXT,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, period_start)
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_period ON public.ai_usage(user_id, period_start DESC);

ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='ai_usage' AND policyname='Users can view own ai usage'
  ) THEN
    CREATE POLICY "Users can view own ai usage" ON public.ai_usage FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='ai_usage' AND policyname='Users can insert own ai usage'
  ) THEN
    CREATE POLICY "Users can insert own ai usage" ON public.ai_usage FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='ai_usage' AND policyname='Users can update own ai usage'
  ) THEN
    CREATE POLICY "Users can update own ai usage" ON public.ai_usage FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;
