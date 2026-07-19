
-- Profiles: restrict read to authenticated
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
REVOKE SELECT ON public.profiles FROM anon;
GRANT SELECT ON public.profiles TO authenticated;
CREATE POLICY "Authenticated users can view profiles"
  ON public.profiles FOR SELECT TO authenticated USING (true);

-- Contact submissions: block anon direct inserts (server fn uses service role)
DROP POLICY IF EXISTS "Anyone can submit valid contact form" ON public.contact_submissions;
REVOKE INSERT ON public.contact_submissions FROM anon;

-- Revoke EXECUTE on SECURITY DEFINER functions from public roles
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
