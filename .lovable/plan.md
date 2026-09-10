# Merge Insights into the Blog page

## Goal
One place for articles: the Blog. The separate Insights page (fixed text, nothing uploadable) goes away, and everything points to the Blog where you publish from the admin panel.

## Changes

1. **Remove the Insights page**
   - Delete `src/routes/insights.tsx` (the page with 3 fixed commentary cards).

2. **Update navigation**
   - `src/components/site/Header.tsx` — remove the "Insights" menu item; keep "Blog".
   - `src/components/site/Footer.tsx` — remove the Insights link.

3. **Keep the old link working**
   - Replace `/insights` with a permanent redirect to `/blog`, so any old links or bookmarks still land somewhere useful.

4. **Sitemap**
   - Remove `/insights` from `src/routes/sitemap[.]xml.ts` so search engines only index the Blog.

## Result
- Menu shows Blog only; nothing confusing or duplicated.
- All articles are published and managed from /admin/blog (sign in at /auth), with images, edit, and delete — as they already work today.

## Technical notes
- `/insights` becomes a route file that throws a `redirect({ to: "/blog" })` (301-style) so the URL never breaks.
- No database or design changes; nothing else on the site is touched.
