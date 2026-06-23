
-- Tighten contributions INSERT policy with real checks
DROP POLICY "Anyone can submit a contribution" ON public.contributions;
CREATE POLICY "Anyone can submit a contribution"
  ON public.contributions FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 80
    AND length(btrim(reference)) BETWEEN 1 AND 60
    AND (message IS NULL OR length(message) <= 500)
    AND amount_cents > 0
    AND amount_cents <= 100000000
    AND verified = false
  );

-- Lock down cache_kv (server-only)
CREATE POLICY "Deny all client access to cache_kv"
  ON public.cache_kv FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

-- Restrict has_role execution; policies run as table owner so this is safe
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
