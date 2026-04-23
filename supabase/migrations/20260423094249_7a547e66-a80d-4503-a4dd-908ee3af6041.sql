
-- Fix mutable search_path on set_updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Tighten contact submission insert: require non-empty fields and length limits
drop policy if exists "Anyone can insert contact submissions" on public.contact_submissions;
create policy "Anyone can submit valid contact form"
  on public.contact_submissions for insert
  with check (
    length(trim(name)) between 1 and 100
    and length(trim(email)) between 3 and 255
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and length(trim(message)) between 1 and 5000
    and (phone is null or length(phone) <= 30)
    and (subject is null or length(subject) <= 200)
  );

-- Restrict storage object listing: allow public to read individual files (already public via bucket)
-- but prevent broad listing by restricting SELECT to objects accessed by id (the public CDN URL works without listing).
-- Replace overly broad SELECT with one that still allows public file delivery via signed/public URLs (which use storage.objects internally).
-- The public bucket flag enables CDN URLs without needing a SELECT policy at all for those URLs.
drop policy if exists "Blog images are publicly accessible" on storage.objects;
create policy "Admins can list blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images' and public.has_role(auth.uid(), 'admin'));
