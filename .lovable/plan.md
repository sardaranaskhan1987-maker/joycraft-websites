# Fix: blog posts never save, so the blog page stays empty

## What I found

- The blog posts table currently holds **zero rows** — nothing you wrote was ever saved.
- The cause is a missing database permission grant. The tables (blog posts, contact submissions, profiles, roles) have access rules defined, but the underlying permission that lets the app reach them was never granted. Every save attempt is rejected before the rules are even checked, and every read comes back empty.
- Confirmed by inspecting the permission grants for all app tables: there are none.
- Your admin account (`admin@biznessdoctor.com`) does have the admin role, so access rights are not the problem.

## Plan

1. Run a database change that grants the app the needed access to the four tables, matched to the existing rules:
   - blog posts: read for everyone (published only, enforced by existing rules), plus create/edit/delete for signed-in admins
   - contact submissions: create for visitors, read/delete for admins
   - profiles and roles: read/update as the existing rules already define
2. Publish a test post from the admin panel and confirm it appears on the blog page and opens on its own page.
3. Send a test enquiry from the contact form and confirm it lands in the submissions list — the same missing-permission problem affects that form, so form messages are very likely also being lost right now.

## Technical notes

- Root cause: no `GRANT` statements for `anon` / `authenticated` / `service_role` on `public.blog_posts`, `public.contact_submissions`, `public.profiles`, `public.user_roles`. PostgREST returns a permission error regardless of RLS.
- Grants to add:
  - `blog_posts`: `SELECT` to `anon, authenticated`; `INSERT, UPDATE, DELETE` to `authenticated`; `ALL` to `service_role`
  - `contact_submissions`: `INSERT` to `anon, authenticated`; `SELECT, DELETE` to `authenticated`; `ALL` to `service_role`
  - `profiles`: `SELECT, UPDATE` to `authenticated`; `ALL` to `service_role`
  - `user_roles`: `SELECT` to `authenticated`; `ALL` to `service_role`
- `/blog` and `/blog/$slug` loaders use the service-role client, which also needs its grant; RLS still restricts anon reads to published posts.
- No frontend changes expected; verification via the admin panel and the blog page.
