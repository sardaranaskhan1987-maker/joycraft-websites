DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.blog_posts;

CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Signed-in users view published posts and admins view all"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (published = true OR public.has_role(auth.uid(), 'admin'::app_role));