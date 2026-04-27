
# Speed up the site

## Where the slowness is coming from

Looking at the live site, three things are slowing every page load:

1. **No link preloading.** Right now, when you click a nav item, the browser waits to download that route's code + data before showing anything. TanStack Router supports preloading on hover, but it's not turned on.
2. **Heavy Google Fonts payload.** We're loading 4 weights of Inter and 3 weights of Cormorant Garamond — but the design only uses 2 of each. The font CSS is also render-blocking.
3. **Blog index waits to fetch posts client-side.** The list query starts only after the page renders, so users see "Loading…" briefly even when the data is tiny. We can move this into a route loader so SSR delivers the posts pre-rendered.

## Fixes

**Preload routes on hover (biggest perceived-speed win)**
In `src/router.tsx`, add `defaultPreload: "intent"`. Now hovering "Services", "Blog", or "Contact" for ~50ms downloads that route in the background, so the click is essentially instant.

**Trim Google Fonts**
In `src/routes/__root.tsx`, change the font URL from
`Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700`
to
`Cormorant+Garamond:wght@600&family=Inter:wght@400;600`.
This roughly halves font bytes and cuts a chunk of render-blocking CSS time.

**SSR the blog list**
In `src/routes/blog.index.tsx`, replace the `useEffect`+`useState` Supabase call with a `createServerFn` loader that fetches published posts with the admin client (already used elsewhere). The page then arrives fully rendered instead of flashing "Loading…".

**Lighten the homepage Open Graph image reference**
The `og:image` in `__root.tsx` points to a 1.7 MB Lovable preview screenshot. It's only used by social cards — but having such a large image referenced from every page hurts when scrapers/preview tools pull it. Remove it from the root `head()` (per the route-architecture rule, root shouldn't carry an og:image anyway since it pollutes every page) and let individual routes set their own when they have a hero image worth sharing.

## Files touched

- `src/router.tsx` — add `defaultPreload: "intent"`
- `src/routes/__root.tsx` — trim font weights, remove root-level og:image/twitter:image
- `src/routes/blog.index.tsx` — convert to SSR loader via `createServerFn`

After these changes: hovering a nav item warms the next page so clicks feel instant; first paint is faster because the font payload is smaller; the blog page renders with content already in place.
