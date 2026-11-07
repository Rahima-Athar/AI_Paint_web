<<<<<<< HEAD
# WALLORA AI — Luxury Architectural Room Paint Visualizer

> **"Your Space, Your Colors, Your Imagination."**  
> *Design Direction: Lavender Dream • Premium & Elegant*

---

## 1. Overview & Architecture

Wallora AI is an ultra-premium architectural room wall paint visualizer engineered for homeowners, luxury interior designers, and architects. It enables users to preview curated paint collections in their actual room photography while preserving natural molding shadows, furniture, window daylight streams, and architectural geometry.

### Bespoke Brand Design System: Lavender Dream
Wallora AI is crafted using the bespoke **Lavender Dream** identity:

| Token Name | Hex Code | Architectural Usage |
| :--- | :--- | :--- |
| **Royal Lavender** | `#74608F` | Primary brand accent, hero statements, active navigation |
| **Soft Lilac** | `#B7A1CF` | Secondary highlights, card borders, subtle glows |
| **Dusty Rose** | `#D9B8CE` | Accent panels, warm sunset gradients |
| **Blush Pink** | `#E9D9E9` | Soft backgrounds, badges, surface highlights |
| **Warm Cream** | `#F7F0EB` | Main backdrop, whitespaces, editorial canvas |
| **Soft Gold** | `#C3A77D` | Luxury metallic trims, brass hardware accents |
| **Deep Charcoal** | `#1A1523` | High-contrast editorial typography, deep shadows |

- **Typography**: `Playfair Display` (editorial serif headings) & `Poppins` (precision sans-serif metrics and controls).

---

## 2. Core Implemented Features

1. **Interactive Image Upload Zone**:
   - Drag-and-drop room photo dropzone with MIME type validation (`JPEG`, `PNG`, `WebP`) and 10 MB size limits.
   - Architectural Room Type selector (`Living Room`, `Master Bedroom`, `Dining Room`, `Kitchen`, `Study`, `Other`).
   - 4 Preloaded high-resolution architectural presets (`Nordic Living Salon`, `Parisian Master Suite`, `Minimalist Dining Hall`, `Warm Oak Library`) for immediate one-click testing.

2. **Anti-Gravity Physics Swatch Visualizer**:
   - Zero-gravity floating paint spheres powered by **Matter.js** (with automatic graceful spring-physics fallback).
   - Interactive cursor attraction, magnetic pulse, and scatter controls.
   - Click any floating orb to lock it as your active room shade with tactile visual feedback.

3. **Draggable Before/After Comparison Split Slider**:
   - Interactive split-slider viewport with custom brushed brass grab-handle.
   - Responsive mouse and touch drag support, plus keyboard accessibility (`ArrowLeft` / `ArrowRight`).
   - Side-by-Side comparison toggle fallback.

4. **Triple-Lighting Architectural Simulator**:
   - **Morning Sun (5,500K)**: Crisp daylight with gentle warm morning rays.
   - **Warm Evening (2,700K)**: Golden hour radiance and ambient sunset glow.
   - **Studio Neutral (4,000K)**: Balanced architectural gallery lighting with high CRI.

5. **Luminance-Preserving Wall Recoloring Engine**:
   - Intelligent multi-layer canvas shader isolating wall planes while retaining baseboards, crown moldings, wood grains, and cast shadows.
   - Provider Adapter Architecture with honest labeling: "Interactive Studio Simulation Adapter" vs "Connected AI Inpainting Provider" (strictly adhering to Sections 0, 6.4, and 20).

6. **Shade Matcher, LRV & Real Brand Equivalents**:
   - True architectural **LRV (Light Reflectance Value)** formula calculations:  
     $$LRV = 0.2126 \cdot (R/255)^{2.2} + 0.7152 \cdot (G/255)^{2.2} + 0.0722 \cdot (B/255)^{2.2}$$
   - Technical specifications: HEX, RGB, LRV, Undertone, Sheen finish (`Matte`, `Eggshell`, `Satin`, `Semi-Gloss`).
   - Commercial manufacturer codes matched to real brands: **Sherwin-Williams**, **Benjamin Moore**, **Dulux**, and **Farrow & Ball**.

7. **Dual-Tone Accent Wall Mode**:
   - Select between "All Visible Walls" and "Feature Accent Wall".
   - Independently configure surrounding wall paint vs accent wall focal point.

8. **Architectural Paint & Budget Estimator**:
   - Real-time room dimensions calculation (Length × Width × Height).
   - Deducts doors & window openings (~15%).
   - Calculates exact net surface area, gallons, liters, and estimated material cost.

9. **Spatial Web Audio Synthesizer**:
   - Zero-dependency crystal harmonic chime (Web Audio API) for swatch interaction and tactile clicks on controls, with mute toggle.

10. **Printable Client PDF Spec Sheet**:
    - Generates a client-ready architectural specification deck complete with before/after photography, specs, paint volume, and approval signature block ready for `window.print()` / PDF export.

11. **Portfolio & Design Management**:
    - **My Designs Gallery**: Save projects with before/after snapshots, favorite toggle, rename modal, and safe deletion confirmation.
    - **High-Res Export**: Generates and downloads an architectural design deck (PNG) complete with project metrics.

12. **Architectural Color Library**:
    - Searchable, filterable archive of 24+ curated luxury architectural wall paints.

---

## 3. Quick Start & Local Setup

### Option A: Double-Click or Static Serving (Zero Dependencies)
You can directly open `index.html` in any modern web browser! All dependencies (fonts, Matter.js, Confetti) are loaded asynchronously via CDN with offline fallbacks.

### Option B: Local Node Server
Run the built-in zero-dependency development server:
```bash
node server.js
```
Open your browser to: **`http://localhost:3000`**

### Option C: Run Automated Tests
```bash
node test.js
```

---

## 4. Supabase Database & Storage Setup

Wallora AI includes a production-ready PostgreSQL migration in `supabase/migrations/20261103000000_wallora_schema.sql`.

### Applying the Schema
1. Open your [Supabase Dashboard](https://supabase.com).
2. Navigate to **SQL Editor**.
3. Paste the contents of `supabase/migrations/20261103000000_wallora_schema.sql` and click **Run**.

### Schema Summary:
- **`profiles`**: User profiles linked to `auth.users(id)`.
- **`projects`**: Room design projects with status (`draft`, `uploaded`, `processing`, `completed`, `failed`).
- **`design_variants`**: Saved recoloring variants with `#RRGGBB` check constraints and provider flags.
- **`palettes` & `palette_colors`**: Seeded with curated Lavender Dream, Nordic Tranquility, and Emerald Estate collections.
- **`favorites`**: User-favorited designs.
- **Row Level Security (RLS)**: Enforced on all user tables with strict `auth.uid() = user_id` policies.
- **Storage Buckets**: `room-originals` (private) and `design-variants` (private).

---

## 5. AI Inpainting Provider Setup

Wallora AI uses an adapter interface (`src/services/imageEditingProvider.js`) to insulate UI logic from specific AI vendors:

- **Demo Mode (Default)**: Uses fast, client-side edge luminosity shaders. No API keys required.
- **Replicate SDXL Inpainting**: Set `IMAGE_EDITING_PROVIDER=replicate` and `IMAGE_EDITING_API_KEY=r8_...`.
- **Stability AI Inpainting**: Set `IMAGE_EDITING_PROVIDER=stability` and `IMAGE_EDITING_API_KEY=sk-...`.

---

## 6. Implementation Checklist & Status

| Requirement / Section | Status | Notes |
| :--- | :--- | :--- |
| **Lavender Dream Brand Tokens** | Completed | Royal Lavender, Soft Lilac, Dusty Rose, Blush Pink, Warm Cream, Soft Gold |
| **Interactive Upload & Presets** | Completed | Drag & drop, 10MB check, 4 SVG presets |
| **Anti-Gravity Physics Swatches** | Completed | Matter.js + Canvas spring fallback |
| **Lighting Simulator (3 Modes)** | Completed | 5500K Morning Sun, 2700K Evening, 4000K Neutral |
| **Comparison Slider & Side-by-Side**| Completed | Mouse/touch drag, keyboard arrows |
| **Shade Matcher & LRV Metrics** | Completed | Architectural LRV formula, finishes |
| **My Designs & High-Res Export** | Completed | Saved designs, rename, delete, PNG download |
| **Supabase SQL Migration & RLS** | Completed | 6 tables, UUIDs, indexes, RLS, storage policies |
| **Provider Adapter Contract** | Completed | Demo Simulation, Replicate, Stability |
| **Owner-Provided Credentials** | Configurable | Optional Supabase and Replicate/Stability API keys |

---

## 7. Authentication & Profile (Supabase)

Wallora AI now supports Supabase Auth (email/password) and user profiles.

### Enable Auth
1. Supabase Dashboard → **Authentication → Providers → Email** → enable (disable “Confirm email” for local testing if desired).
2. (Optional) Enable Google OAuth (see dashboard steps).

### Profile Table Fields
`profiles` stores: `id`, `display_name`, `avatar_url`, `created_at`, `updated_at`.

### Avatar Upload
Avatars are uploaded to the **`avatars`** storage bucket (public read). Run the avatar bucket SQL from `supabase/migrations/20261103000000_wallora_schema.sql` (section 11).

### Local Development with Secrets
To keep secrets out of git, create a gitignored file:

`supabase-config.local.js`
```js
window.__WALLORA_SUPABASE_URL__  = 'https://YOUR_PROJECT.supabase.co';
window.__WALLORA_SUPABASE_ANON__ = 'sb_publishable_...';
```

The app reads these globals first, then falls back to placeholders.

## 8. SaaS Polish Features
- Dark mode toggle (persisted in localStorage).
- ARIA focus rings for keyboard navigation.
- Empty-state illustrations.
- Skeleton loaders for async content.
- Service worker for offline shell caching.
- Open Graph / Twitter meta tags.
- Favicon.

---
*Wallora AI — Engineered for Architectural Interior Harmony.*

#   p a i n t _ w e b  
 #   A I _ P a i n t _ w e b  
 #   A I _ P a i n t _ w e b  
 
=======
# AI_Paint_web
>>>>>>> 3e84c148b0154bd11f1c271bcbb8b31950c759b1
