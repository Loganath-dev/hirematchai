-- ============================================================
-- HireMatch AI — Supabase SQL Setup (Idempotent Version)
-- Run this entire script in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_pro          BOOLEAN NOT NULL DEFAULT FALSE,
  upload_count    INTEGER NOT NULL DEFAULT 0,
  upload_reset_at TIMESTAMPTZ NOT NULL DEFAULT DATE_TRUNC('month', NOW()),
  pro_expires_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies (Drop first to avoid "already exists" errors)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 4. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 5. Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- AI Feature Additions
-- ============================================================

-- 6. Create jobs_cache table
CREATE TABLE IF NOT EXISTS public.jobs_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT UNIQUE NOT NULL,
  jobs JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for jobs_cache (allow service_role only by default, or open reads)
ALTER TABLE public.jobs_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cache, but only service_role can insert/update via API
DROP POLICY IF EXISTS "Public can view jobs_cache" ON public.jobs_cache;
CREATE POLICY "Public can view jobs_cache"
  ON public.jobs_cache FOR SELECT
  USING (true);
