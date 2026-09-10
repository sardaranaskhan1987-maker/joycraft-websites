# Justify paragraph text across the website

## Goal

Change body paragraph text from left-aligned to justified (even left and right edges) across the site, as shown in your screenshots — the hero text, "Why Clients Engage" box, "Independent Financial Advisory" section, and the About page cards. Nothing else changes: layout, spacing, colors, fonts, headings, buttons, and menus stay exactly as they are.

## What will change

- All longer paragraph text across the pages becomes justified: Home, About, Services, Training, Blog articles, and Contact.
- Text inside cards and boxes (like "Why Clients Engage" and the About cards) is included, matching your screenshots.
- Headings and titles stay as they are (left-aligned) — justifying headings looks broken and they are short anyway.
- Small one-line items (dates, labels, bullet lists, buttons, footer, form fields) are visually unaffected, because justification only shows on text that wraps to multiple lines.
- Automatic hyphenation is enabled so justified text doesn't create ugly large gaps between words on narrow screens and mobile.

## How (one small change)

Add a single rule to the site's global stylesheet (`src/styles.css`):

```css
main p {
  text-align: justify;
  hyphens: auto;
}
```

This targets only paragraph text in the page content area — the header, footer, menus, and admin screens are untouched.

## Verification

- Build must pass with no errors.
- Check Home, About, Services, and Training pages visually to confirm paragraphs now align to both edges and nothing else moved.
