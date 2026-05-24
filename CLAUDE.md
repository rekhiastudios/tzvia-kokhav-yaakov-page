# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context — read this first, every session

**What we're building:** `tzvia-page` is a full ground-up redesign of the public website for **Ulpanat Tzvia (Kochav Yaakov)**, an Israeli religious-Zionist girls' high school (אולפנת צביה כוכב יעקב). The previous site is being replaced — this is not an incremental update. The institutional voice is Hebrew-first; the site exists primarily for prospective students and families, current parents, and the wider community.

**Design intent:** modern, technological, visually striking. The site is meant to *feel* contemporary and high-quality — closer to a tech product landing page than a typical school site. Visual impact is the primary objective, not data depth.

**The 3D model is the signature feature.** A realistic Blender-built 3D model of the school's campus / main building is the centerpiece of the Hero section, used for cinematic intros and ambient motion. Treat any work that touches the Hero as work that has to coexist with this 3D scene (performance, layering, fallback, mobile behavior, RTL composition over the canvas).

**Phase:** prototype. The 3D model is at MVP. The page itself has Figma sketches for the first sections (Hero, About Us, News & Updates, Academy / Activities & Academic Areas) but no visual prototypes yet for Calendar, Contact, or Footer — design for those will land later. No backend: this site is currently informative and visual only — **no APIs, no databases, no auth, no CMS**. All copy lives in the i18n message bundles.

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

### Routes (current + planned)

- `/[locale]` — home page. **Live in repo, currently broken (see Build status).**
- `/[locale]/articles/[id]` — single-article page. **Planned, not yet implemented.** No article index page is planned for now; articles are reached through the NavBar's dynamic search.

The middleware redirects `/` to the locale-prefixed root.

### Home sections (canonical order)

The home page is composed of these sections, in this order:

1. **Hero** — full-bleed, hosts the 3D campus model / cinematic. Headline, sub-headline, CTA ("לחקור" / "Explore").
2. **About Us** (`קצת עלינו`) — institutional intro, mission, religious-Zionist framing.
3. **News & Updates** — recent announcements / posts. Entry points into the articles subroute.
4. **Academy** — "Activities & Academic Areas". Carousel-style showcase of academic tracks (e.g. Reading, Research & Critical Thinking; Culture & Humanities; etc.).
5. **Calendar** — school calendar / upcoming events. **Design pending.**
6. **Contact** — contact form / contact info. **Design pending.** Form submission target is undecided; do not wire it to a backend without confirmation.
7. **Footer** — site-wide footer. **Design pending.**

> Note: the current `app/[locale]/page.tsx` imports sections in a different order (Hero → About → Academy → Calendar → News → Contact). Reorder to match the canonical list above when implementing.

### NavBar

- Logo (school crest), hamburger / menu trigger, search icon, language switcher (`EN` / `HE`).
- **Dynamic search** is a first-class feature: it queries across articles and surfaces results inline. Implementation will need an in-memory index of article metadata until/unless a backend is introduced.
- The language switcher must preserve the current path when toggling locales — use `i18n/navigation.ts` (`<Link href={pathname} locale={l}>`).

## Architecture

### Current build status

**The app does not currently build or run.** `app/[locale]/layout.tsx` imports `NavBar` from `components/layout/NavBar.tsx` and `Footer` from `components/layout/Footer.tsx`, and `app/[locale]/page.tsx` imports six section components from `components/home/`. All eight files exist as empty (or syntactically broken) stubs with no exports — see "Component layout" below. Implementing those exports is the next required step.

### Internationalization

Locale-prefixed routing is wired up. Visiting `/` should redirect to `/he` (Hebrew default) or `/en` via the middleware once the components above exist.

- `i18n/routing.ts` declares locales `['en', 'he']` with `localePrefix: 'always'`. **Default locale should be `he`** (Hebrew-first product). If the current default is `en`, treat that as a config bug to fix.
- `middleware.ts` (project root) runs `createMiddleware(routing)`. The matcher excludes `api`, `trpc`, `_next`, `_vercel`, and any path with a file extension.
- `i18n/request.ts` is the `next-intl` request config. For each request it loads two bundles per locale and merges them into a single message object: `messages/${locale}.json` (UI copy — top-level namespaces like `hero`, `navbar`, `about`, `academy`, `calendar`, `news`, `contact`, `footer`) and `messages/${locale}/seo.json` (page metadata, exposed as the `seo` namespace). Both bundles must exist for every locale and stay in sync; the UI bundles are populated for `en` and `he`.
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

- `components/ui/` — shadcn primitives (currently just `button.tsx`).
- `components/layout/` — `NavBar` and `Footer`. Both files exist but are empty/broken stubs with no exports. `app/[locale]/layout.tsx` already imports them as named exports (`{NavBar}`, `{Footer}`), so any implementation must export those names.
- `components/home/` — landing-page sections. Files exist as empty stubs and must each export a named function matching the filename: `HeroSection`, `AboutSection`, `NewsSection`, `AcademySection`, `CalendarSection`, `ContactSection`. The intended pattern is a server component that pulls copy via `useTranslations(<namespace>)` against a top-level key in `messages/${locale}.json` (`hero`, `about`, `news`, `academy`, `calendar`, `contact`). New copy must be added to **both** `en.json` and `he.json` to keep the bundles aligned; new SEO fields belong in `messages/${locale}/seo.json` for both locales.
- `components/three/` (planned) — three.js / R3F scene for the Hero 3D model. Not yet present; place 3D-specific code here when it lands so it stays isolated from the rest of the UI.

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

- Final designs for Calendar, Contact, and Footer sections.
- 3D Hero rendering approach: real-time WebGL (three.js / react-three-fiber) vs. pre-rendered video loop with a static fallback. Affects bundle size and mobile behavior.
- Article content source: hardcoded MDX/JSON in repo vs. future CMS. Until decided, assume in-repo content.
- Search backing: in-memory list of article frontmatter is the default assumption.