DROP POLICY IF EXISTS "anyone can insert page views" ON public.page_views;

CREATE POLICY "anyone can insert page views"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  path IS NOT NULL
  AND length(path) BETWEEN 1 AND 2048
  AND (referrer IS NULL OR length(referrer) <= 2048)
  AND (device IS NULL OR length(device) <= 64)
  AND (country IS NULL OR length(country) <= 128)
  AND (visitor_hash IS NULL OR length(visitor_hash) <= 128)
);