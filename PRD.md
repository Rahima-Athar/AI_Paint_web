# Wallora AI — Product Requirements Document (PRD)

## 1. Product Overview
Wallora AI is a luxury architectural room wall paint visualizer. Users upload a room photo (or use presets), pick colors, preview recoloring under different lighting, save designs, and export client-ready spec sheets.

## 2. Target Users
- Homeowners
- Interior designers
- Architects

## 3. Core Features
- Room photo upload (JPEG/PNG/WebP, ≤10MB) + room type selector.
- 4 curated architectural presets.
- Anti-gravity physics swatch visualizer (Matter.js + fallback).
- Before/after comparison slider (mouse/touch/keyboard).
- Triple lighting simulator (Morning 5500K, Evening 2700K, Neutral 4000K).
- Luminance-preserving wall recoloring (demo client-side shader + optional AI providers).
- Shade matcher: HEX, RGB, LRV, undertone, sheen finish.
- Real brand equivalents (Sherwin-Williams, Benjamin Moore, Dulux, Farrow & Ball).
- Dual-tone accent wall mode.
- Paint volume & budget estimator.
- Spatial Web Audio chimes.
- Printable client spec sheet (PDF via window.print).
- High-res design deck export (PNG).
- My Designs gallery (save, rename, delete, favorite).
- Color library (search/filter 20+ colors).
- Supabase Auth (email/password) + profiles.
- Profile page with stats, preferences, saved palettes, activity, usage tracking.
- Dark mode toggle.
- Service worker offline shell.

## 4. Routes
- `/` (landing) — Discover
- `/studio` — Design Studio (3 steps)
- `/library` — Color Library
- `/designs` — My Saved Designs
- `/profile` — My Profile (protected)
- `/settings` — (modal) Account settings

## 5. Design System — Lavender Dream
- Royal Lavender: #74608F
- Soft Lilac: #B7A1CF
- Dusty Rose: #D9B8CE
- Blush Pink: #E9D9E9
- Warm Cream: #F7F0EB
- Soft Gold: #C3A77D
- Typography: Playfair Display (headings), Poppins (body).

## 6. Database (Supabase)
Tables: profiles, projects, design_variants, palettes, palette_colors, favorites, ai_usage.
Storage buckets: room-originals (private), design-variants (private), avatars (public).
RLS enabled on all user tables.

## 7. AI Provider Adapter
- Demo (default, client-side).
- Replicate SDXL (optional, requires API key).
- Stability AI (optional, requires API key).

## 8. Environment Variables
- SUPABASE_URL
- SUPABASE_ANON_KEY (publishable)
- IMAGE_EDITING_PROVIDER (demo/replicate/stability)
- IMAGE_EDITING_API_KEY

## 9. Local Development
- `node server.js` → http://localhost:3000
- `node test.js` → verification suite

## 10. Security
- Path traversal protection on static server.
- RLS on all user data.
- Service role keys never in frontend.
- Local override file for secrets (gitignored).

## 11. Testing
- 5/5 automated tests pass.
- Lighthouse: Accessibility 1.0, Best Practices 1.0, SEO 1.0.
- Console: no errors in smoke tests.