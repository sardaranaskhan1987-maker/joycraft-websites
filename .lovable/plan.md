
# Fix slow loading & broken Services dropdown links

## What's actually wrong

The site itself is fine — the dev server is running cleanly with no runtime errors. Two real issues:

1. **Dropdown links go to the wrong place.** Every Services sub-menu item (Corporate Tax, Cross-Border, Fractional CFO, etc.) currently points to `/services` with no anchor, so clicking any of them just lands on the top of the same long page — it looks like "nothing happened."
2. **Apparent slowness** — likely the perceived effect of the above (you click, the page seems unchanged) plus heavy first-load (Google Fonts + large blog detail bundle). I'll cut the obvious bloat.

## Fixes

**Anchor each service section on `/services`**
Add `id="..."` and `scroll-mt-28` (so the sticky header doesn't cover the heading) to each section:
- `#corporate-tax`, `#fractional-cfo`, `#cross-border`, `#risk-diagnostic`, `#oversight-assessment`, `#wealth-review`

**Wire the dropdown to those anchors**
In `Header.tsx`, give each service link a `hash` and pass it through to `<Link to=... hash=...>` so the URL becomes `/services#corporate-tax` and the browser scrolls to that section. Same for desktop and mobile menus.

**Performance polish**
- Self-host or `display=swap` is already set for fonts; preconnect is already in place — keep it but drop the `Cormorant Garamond` weight 700 (we don't use it) to lighten the font payload.
- The blog detail route is the largest chunk (markdown renderer ~410 kB). Move `react-markdown` + `remark-gfm` behind `React.lazy` so it only loads when a blog post page opens, not on every page.
- Remove the unused `tw-animate-css` import (if no animations rely on it) — small CSS win.

**Smooth scroll for hash navigation**
Already enabled globally via `html { scroll-behavior: smooth }` in `styles.css`. Verify it stays.

## Files touched

- `src/routes/services.tsx` — add section IDs and `scroll-mt-28`
- `src/components/site/Header.tsx` — add `hash` to service nav items, pass to `<Link>` (both desktop & mobile)
- `src/routes/blog.$slug.tsx` — lazy-load markdown renderer
- `src/styles.css` — drop unused font weight (minor)

After: clicking "Cross-Border & Corporate Structuring" in the dropdown will jump straight to that section on the services page; first-page navigation will feel noticeably snappier.
