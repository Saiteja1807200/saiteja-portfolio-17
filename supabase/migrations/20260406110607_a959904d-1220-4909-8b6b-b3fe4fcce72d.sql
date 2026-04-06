
-- Access tokens table
CREATE TABLE public.access_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  label TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.access_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view tokens"
  ON public.access_tokens FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create tokens"
  ON public.access_tokens FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tokens"
  ON public.access_tokens FOR DELETE TO authenticated USING (true);

-- Public read policy for token validation (anon users checking if token is valid)
CREATE POLICY "Anyone can validate a token"
  ON public.access_tokens FOR SELECT TO anon
  USING (true);

-- Token views tracking table
CREATE TABLE public.token_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id UUID NOT NULL REFERENCES public.access_tokens(id) ON DELETE CASCADE,
  viewer_info JSONB,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.token_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view tracking data"
  ON public.token_views FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can log a view"
  ON public.token_views FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated can log a view"
  ON public.token_views FOR INSERT TO authenticated WITH CHECK (true);

-- Function to increment view count and log view
CREATE OR REPLACE FUNCTION public.log_token_view(p_token TEXT, p_viewer_info JSONB DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token_id UUID;
BEGIN
  SELECT id INTO v_token_id
  FROM public.access_tokens
  WHERE token = p_token
    AND (expires_at IS NULL OR expires_at > now());

  IF v_token_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE public.access_tokens SET view_count = view_count + 1 WHERE id = v_token_id;

  INSERT INTO public.token_views (token_id, viewer_info) VALUES (v_token_id, p_viewer_info);

  RETURN TRUE;
END;
$$;
