# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context — read this first, every session

**What we're building:** `tzvia-page` is a full ground-up redesign of the public website for **Ulpanat Tzvia (Kochav Yaakov)**, an Israeli religious-Zionist girls' high school (אולפנת צביה כוכב יעקב). The previous site is being replaced — this is not an incremental update. The institutional voice is Hebrew-first; the site exists primarily for prospective students and families, current parents, and the wider community.

**Design intent:** modern, technological, visually striking. The site is meant to *feel* contemporary and high-quality — closer to a tech product landing page than a typical school site. Visual impact is the primary objective, not data depth.

**The 3D model is the signature feature.** A realistic Blender-built 3D model of the school's campus / main building is the centerpiece of the Hero section, used for cinematic intros and ambient motion. Treat any work that touches the Hero as work that has to coexist with this 3D scene (performance, layering, fallback, mobile behavior, RTL composition over the canvas).

**Phase:** prototype, but **further along than this doc once implied**. The home page and all secondary routes are now built and render in both locales (see "Architecture → Current build status"). The 3D model is at MVP and is **not yet wired into the Hero** — `HeroSection` currently ships without a live 3D canvas. No backend: this site is informative and visual only — **no APIs, no databases, no auth, no CMS**. All copy lives in the i18n message bundles; structured page data (academy activities, news articles) lives in typed modules under `lib/`.

**Content is still placeholder.** The data in `lib/activities.ts` and `lib/articles.ts` is design-stage mock content (invented activities like volleyball/running/dance, English news like a "robotics championship") and does **not** match the real school. The real institutional content — the genuine מגמות, the real מבזקים, the About copy, contact details — comes from the previous live site at `https://zviyaky.tik-tak.school/`. Treat `lib/` data as a layout fixture to be replaced, not as source of truth.

**Bilingual, Hebrew-default.** The site supports Hebrew and English natively. Hebrew is the default; the URL scheme is `/[locale]/...` with `he` as the canonical default and `en` as a parallel locale. Hebrew renders RTL.

**Persistent reminder for Claude Code:** at the start of every session, re-read this file and keep this context in mind for the entire conversation. When a request is ambiguous, default to choices that (a) prioritize visual polish, (b) respect the Hebrew-first / RTL nature of the site, (c) keep the door open for the 3D Hero and don't break it, and (d) don't introduce backend dependencies the project doesn't have.

## Commands

- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (extends `next/core-web-vitals` and `next/typescript`)

There is no test framework configured.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **shadcn/ui** (style `radix-vega`, base color `neutral`, `lucide-react` icons)
- **next-intl** for i18n
- **Blender-exported 3D model** for the Hero scene — rendering pipeline (three.js / react-three-fiber, video fallback, etc.) is TBD; coordinate before introducing the dependency.

No state management library, no data-fetching layer, no DB, no API routes are expected at this phase. If a task seems to require any of these, stop and confirm before adding them.

## Site structure

### Routes (implemented)

All routes live under `app/[locale]/` and are statically generated (`generateStaticParams` + `setRequestLocale`) for both `he` and `en`. The middleware redirects `/` to the locale-prefixed root.

- `/[locale]` — home page (composed of the home sections below).
- `/[locale]/about-us` — About Us page → `components/about/AboutUsPage` (`aboutPage` namespace).
- `/[locale]/academy` — academy index, filterable → `components/academy/AcademyIndexClient`, data from `lib/activities`.
- `/[locale]/academy/[category]` — same client, pre-filtered to one category. Categories: `arts`, `science`, `sports`, `humanities` (`VALID_CATEGORY_SLUGS`).
- `/[locale]/academy/[category]/[activity]` — single activity → `components/academy/ActivityDetail`, with related activities.
- `/[locale]/admissions` — `components/admissions/AdmissionsPage` (`admissionsPage` namespace).
- `/[locale]/resources` — `components/resources/ResourcesPage` (`resourcesPage` namespace).
- `/[locale]/news` — news archive → `components/news/NewsArchiveClient`, data from `lib/articles`.
- `/[locale]/news/[slug]` — single article (TOC, facts sidebar, related). **This is the real article route** — there is no `/articles/[id]`; slugs are stable and identical across locales.
- `/[locale]/facilities/rent` — campus-rental page → `components/rent/RentPage` (`rentPage` namespace).
- `/[locale]/contact` — `components/contact/ContactPage` (`contactPage` namespace).

The **NavBar** links seven of these: about-us, academy, admissions, resources, news, facilities/rent, contact.

### Home sections (canonical order)

The home page is composed of these sections, in this order:

1. **Hero** (`HeroSection`) — full-bleed. Intended to host the 3D campus model / cinematic; the 3D canvas is **not yet wired in**. Headline, sub-headline, CTA ("לחקור" / "Explore").
2. **About Us** (`AboutSection`, `קצת עלינו`) — institutional intro, mission, religious-Zionist framing.
3. **News & Updates** (`NewsSection`) — recent posts. Entry points into the `/news` subroute.
4. **Academy** (`AcademySection`) — "Activities & Academic Areas", showcase of academic tracks.
5. **Calendar** (`CalendarSection`) — school calendar / upcoming events. Implemented (largest home component); refine design as needed.
6. **Contact** (`ContactSection`) — contact form / contact info. Form submission target is still undecided; do not wire it to a backend without confirmation.

The site-wide **Footer** and a **CreditsStrip** are rendered by `app/[locale]/layout.tsx`, not by the home page. `app/[locale]/page.tsx` already imports the sections in this canonical order (Hero → About → News → Academy → Calendar → Contact).

### NavBar

- Logo (school crest), hamburger / menu trigger, search icon, language switcher. Implemented in `components/layout/NavBar.tsx` (`"use client"`), with a menu overlay listing the seven nav links.
- **Dynamic search** is intended as a first-class feature querying across articles. Until a backend exists it needs an in-memory index of article metadata from `lib/articles`.
- The language switcher preserves the current path when toggling locales — `i18n/navigation.ts` (`<Link href={pathname} locale={l}>`).

## Architecture

### Current build status

**The app is built out and renders.** `app/[locale]/layout.tsx` mounts `NavBar`, `Footer`, and `CreditsStrip`; `app/[locale]/page.tsx` composes the six home sections; and every secondary route under `app/[locale]/` has a working page + component (see Routes above). The home sections and layout chrome are implemented (~5,600 lines across `components/` and `lib/`). The remaining gaps are **content** (replace `lib/` mock data with real institutional content) and the **3D Hero** (not yet integrated), not missing exports. Always run `npm run build` / `npm run lint` to confirm before assuming the tree is broken.

### Internationalization

Locale-prefixed routing is wired up. Visiting `/` redirects to the default locale via the middleware.

- `i18n/routing.ts` declares locales `['en', 'he']` with `localePrefix: 'always'`. ⚠️ **Known bug: `defaultLocale` is currently `'en'`.** This product is Hebrew-first, so the default should be `'he'`; `/` redirecting to `/en` is wrong. Fix to `'he'` when touching i18n.
- `middleware.ts` (project root) runs `createMiddleware(routing)`. The matcher excludes `api`, `trpc`, `_next`, `_vercel`, and any path with a file extension.
- `i18n/request.ts` is the `next-intl` request config. For each request it loads two bundles per locale and merges them: `messages/${locale}.json` (UI copy) and `messages/${locale}/seo.json` (page metadata, exposed as the `seo` namespace). Both bundles exist and are populated for `en` and `he` and must stay in sync. Current top-level namespaces in the UI bundle: `navbar`, `hero`, `about`, `news`, `academy`, `calendar`, `contact`, `footer`, `credits`, plus the per-route page namespaces `academyPage`, `aboutPage`, `newsArchive`, `admissionsPage`, `rentPage`, `resourcesPage`, `contactPage`.
- All routed pages live under `app/[locale]/`. There is **no** `app/page.tsx` or `app/layout.tsx` at the root — `app/[locale]/layout.tsx` is the effective root layout and owns `<html lang={locale} dir={…}>`. Hebrew renders with `dir="rtl"`. `components.json` still has `"rtl": false`, but that flag controls shadcn generator output, not runtime direction.
- `app/[locale]/layout.tsx` calls `setRequestLocale(locale)` and wraps children in `NextIntlClientProvider` with messages from `getMessages()`. It also exports `generateStaticParams` and a `generateMetadata` that reads from the `seo` namespace. Pages that need static rendering should also call `setRequestLocale(locale)` at the top — `app/[locale]/page.tsx` does this.
- `i18n/navigation.ts` exports locale-aware `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` — use these instead of the `next/link` / `next/navigation` equivalents anywhere a route is referenced. The `<Link href={pathname} locale={l}>` pattern is how the NavBar language switcher swaps locales while preserving the current path.

### RTL handling

- Hebrew is RTL. The `<html dir>` attribute is set in `app/[locale]/layout.tsx` based on locale.
- All section layouts must be tested in both directions. Prefer logical Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) over physical ones (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`) so both directions just work.
- Typography needs to look good in both Hebrew and Latin scripts — be deliberate about font choices and line-height per locale if needed.

### UI stack

- Tailwind v4 via `@tailwindcss/postcss`, configured through `app/globals.css` (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"`, `tw-animate-css`). There is no `tailwind.config.*` — theme tokens live in `@theme inline` blocks in `globals.css`.
- shadcn/ui is configured in `components.json` with style `"radix-vega"`, base color `neutral`, and `lucide-react` icons. Generated components import from the **`radix-ui`** umbrella package (e.g. `import { Slot } from "radix-ui"`), not the per-primitive `@radix-ui/react-*` packages — preserve that pattern when adding components.
- Path alias `@/*` resolves to the project root (`tsconfig.json`). `cn()` lives in `lib/utils.ts`.

### Visual identity (from Figma sketches)

- Dominant palette: deep navy blue background, warm gold/amber accent (CTAs, highlights), white/cream type, neutral grays for cards.
- Decorative motifs: vertical line clusters, subtle Star of David accents in section borders.
- Typography: large, confident display headings; generous whitespace; cinematic full-bleed imagery.
- Reusable section header pattern: small uppercase eyebrow label (e.g. `ULPENA'S VALUES`, `ACTIVITIES & ACADEMIC AREAS`) above a large headline.
- Layout: sections often break the grid intentionally — overlapping image cards, asymmetric whitespace. Don't over-normalize the layout into uniform stacked blocks.

### Component layout

All of these are **implemented** (no longer stubs):

- `components/ui/` — shadcn primitives (currently just `button.tsx`).
- `components/layout/` — `NavBar`, `Footer`, `CreditsStrip`, all exported as named functions and mounted by `app/[locale]/layout.tsx`.
- `components/home/` — the six home sections, each a named export matching its filename (`HeroSection`, `AboutSection`, `NewsSection`, `AcademySection`, `CalendarSection`, `ContactSection`), plus `CampusMap`. Pattern: pull copy via `useTranslations(<namespace>)` against a top-level key in `messages/${locale}.json`. New copy must be added to **both** `en.json` and `he.json`; new SEO fields belong in `messages/${locale}/seo.json` for both locales.
- `components/{about,academy,admissions,contact,news,rent,resources}/` — the page-level components behind each secondary route (e.g. `AboutUsPage`, `AcademyIndexClient`, `ActivityDetail`, `NewsArchiveClient`, `ArticleBody`, `RentPage`).
- `components/three/` (planned) — three.js / R3F scene for the Hero 3D model. Not yet present; place 3D-specific code here when it lands so it stays isolated from the rest of the UI.

### Data layer (`lib/`)

Structured page content lives in typed in-repo modules, not a CMS. **This is placeholder mock data** (see Project context) — replace with real content from the previous site.

- `lib/activities.ts` — academy data. `CategorySlug = 'arts' | 'science' | 'sports' | 'humanities'`; an array of `ActivityDetail` records (slug, catSlug, name, lede, faculty, timeline, milestones, relatedSlugs), duplicated per locale. Exports `getActivities`, `getActivity`, `getActivitiesByCategory`, `getRelatedActivities`, `VALID_CATEGORY_SLUGS`. Note: these mock categories/activities (volleyball, running, dance, visual-arts, jewish-history) do **not** match the real school's מגמות.
- `lib/articles.ts` — news data. `Article` records with `tag` (`ANNOUNCEMENT | ACHIEVEMENT | EVENT | ALUMNAE`), block-based `body`, TOC, facts, author; duplicated per locale with stable slugs. Exports `getArticles`, `getArticle`, `getRelatedArticles`, `getAllSlugs`. Mock English articles, not the real מבזקים.
- `lib/utils.ts` — `cn()`.

## Conventions

- **Server components by default.** Only mark a section `"use client"` when it actually needs interactivity (search, carousel, language switcher, 3D canvas, form). The Hero 3D scene will be a client island; the surrounding content can stay server-rendered.
- **All user-facing copy goes through `useTranslations`.** Never hardcode Hebrew or English strings inside JSX. Add the key to both `messages/en.json` and `messages/he.json`.
- **Use the i18n-aware navigation helpers** from `i18n/navigation.ts` for any internal link or route change.
- **Logical Tailwind utilities** for any horizontal spacing/positioning (see RTL handling above).
- **No new runtime dependencies without a reason.** Especially: no global state libs, no data fetchers, no form libraries until a section actually needs one. Ask before adding.
- **shadcn imports use the `radix-ui` umbrella** — preserve this when generating new components.
- **Don't add comments that just restate the code.** Keep comments for non-obvious "why".

## Out of scope (for now)

These are explicitly *not* part of the current phase. If a request implies any of them, stop and confirm:

- Backend / API routes / server actions that hit external services
- Database, CMS, or any persistence layer
- Authentication / accounts
- Analytics or tracking
- Email delivery for the Contact form
- Tests (no test framework is configured)

## Open questions / decisions still pending

- **Replace placeholder content with real institutional content** from `https://zviyaky.tik-tak.school/` — the real מגמות (Academy), real מבזקים/news, real registration/forms info. Biggest outstanding task; `lib/activities.ts` and `lib/articles.ts` are currently mock fixtures.
- Decide where the previous site's utilitarian pages map in the new IA: **טפסים** (forms/PDFs), **רשימת ספרים** (book lists), and whether **תהליך רישום** (yearly, date-bound registration steps) belongs under `/admissions`.
- Fix `defaultLocale` to `'he'` in `i18n/routing.ts`.
- 3D Hero: integrate the MVP model into `HeroSection`, and decide real-time WebGL (three.js / R3F) vs. pre-rendered video loop with a static fallback. Affects bundle size and mobile behavior.
- Contact form submission target (no backend wired yet).
- Article/activity content source long-term: keep typed in-repo modules (`lib/`) vs. future CMS. Currently in-repo.