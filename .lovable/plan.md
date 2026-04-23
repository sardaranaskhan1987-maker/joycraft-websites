
# Plan: Convert HTML site → multi-page TanStack site with Contact Form, Blog & Admin

## Site structure (separate routes for SEO)
Convert the single HTML page into proper routes, each with its own `head()` (title, description, og:title, og:description, og:image where a hero image exists):
- `/` — Home (hero, highlights, CTA)
- `/about` — About / firm overview
- `/services` — Services offered
- `/insights` — Insights overview
- `/blog` — Blog listing (NEW)
- `/blog/$slug` — Blog post detail (NEW)
- `/contact` — Contact form + WhatsApp + email
- `/auth` — Sign in (for admin)
- `/admin` — Admin dashboard (protected)
- `/admin/blog/new` and `/admin/blog/$id/edit` — Create/edit blog posts

Shared header + footer in `__root.tsx` with `<Link>` navigation. Sitemap.xml route for SEO.

## Contact form → Google Sheets + WhatsApp
- Fields: Name, Email, Phone, Subject, Message (validated with Zod, length limits, trimmed).
- Submission goes through a server function that:
  1. Inserts the row into a Google Sheet (using Google Sheets connector, owned by **sardaranaskhan1987@gmail.com**).
  2. Saves a copy to the database for admin viewing.
- Floating **WhatsApp button** site-wide → opens `https://wa.me/971585898224` with prefilled message.
- Contact page also shows the WhatsApp number and email as click-to-action buttons.

> You'll be prompted to connect the Google Sheets connector with the sardaranaskhan1987@gmail.com account, and to specify (or auto-create) the target spreadsheet.

## Blog with admin access
**Backend (Lovable Cloud):**
- `profiles` table (auto-created on signup)
- `user_roles` table + `app_role` enum (`admin`, `user`) + `has_role()` security-definer function (per security best practices — roles never on profiles)
- `blog_posts` table: id, slug, title, excerpt, content (markdown/rich text), cover_image_url, author_id, published, published_at, created_at, updated_at
- `contact_submissions` table for storing form entries
- Storage bucket `blog-images` (public read) for cover/inline images
- RLS:
  - Public can read `published = true` posts
  - Only admins can insert/update/delete posts and view contact submissions

**Auth:** Email + password sign-in at `/auth`. First admin promoted manually via SQL note shown after signup (or you give me a specific email to seed as admin).

**Admin UI (`/admin`, protected via `_authenticated` + admin role guard):**
- List of all blog posts with edit/delete/publish toggle
- Rich post editor: title, slug (auto from title), excerpt, cover image upload, content editor, publish toggle
- Inline image upload to Storage
- Contact submissions inbox (read-only list)

**Public blog:**
- `/blog` — grid of published posts with cover image, title, excerpt, date
- `/blog/$slug` — full post; `head()` derives title/description/og:image from the post (great social previews)

## SEO essentials (best practices)
- Per-route `head()` with unique title, description, og:title, og:description, twitter card tags
- og:image set on routes with hero/cover images (blog posts use their cover)
- Semantic HTML (`<article>`, `<header>`, `<nav>`, `<main>`)
- JSON-LD structured data: `Organization` on home, `Article` on blog posts
- `/sitemap.xml` server route listing all static routes + published blog posts
- `/robots.txt` allowing crawl, pointing to sitemap
- Canonical link tags, lang attribute, descriptive alt text on all images
- Fast LCP via image lazy-loading + responsive images

## Design
Faithful to the uploaded `!DOCTYPE_VII.html` look (cream background `#fcfbf8`, serif headings, professional law-firm aesthetic). Built with Tailwind + shadcn components, fully responsive.
