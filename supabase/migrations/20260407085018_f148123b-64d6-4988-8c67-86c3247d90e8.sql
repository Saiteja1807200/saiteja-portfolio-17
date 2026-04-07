
CREATE TABLE public.access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a request
CREATE POLICY "Anyone can submit access request"
ON public.access_requests
FOR INSERT
TO anon
WITH CHECK (true);

-- Authenticated users can view all requests
CREATE POLICY "Authenticated can view requests"
ON public.access_requests
FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can update request status
CREATE POLICY "Authenticated can update requests"
ON public.access_requests
FOR UPDATE
TO authenticated
USING (true);

-- Authenticated users can delete requests
CREATE POLICY "Authenticated can delete requests"
ON public.access_requests
FOR DELETE
TO authenticated
USING (true);
