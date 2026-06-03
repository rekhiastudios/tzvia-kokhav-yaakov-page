# Ulpanat Tzvia Kokhav Yaakov — Website

A full ground-up redesign of the public website for **Ulpanat Tzvia (Kochav Yaakov)**, an Israeli
religious-Zionist girls' high school (אולפנת צביה כוכב יעקב). The site is Hebrew-first, bilingual
(Hebrew / English), and built to feel modern and visually striking — closer to a contemporary product
landing page than a typical school site.

It exists primarily for prospective students and families, current parents, and the wider community.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`; theme tokens live in `app/globals.css`, no `tailwind.config`)
- **shadcn/ui** (style `radix-vega`, base color `neutral`) with `lucide-react` icons
- **next-intl** for internationalization and locale-prefixed routing
- **react-leaflet** for the campus map
- **Cloudinary** as the image/video CDN (no SDK — plain `next/image` against remote URLs)

There is no backend, database, CMS, or auth. The site is informative and visual only. All UI copy lives
in the i18n message bundles; structured content (news articles, academy activities) lives in typed
in-repo modules under `lib/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /he)
```

Other scripts:

```bash
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

> No test framework is configured.

## Internationalization

- Locales: `['en', 'he']`, default **`he`** (Hebrew-first). Hebrew renders **RTL**.
- URL scheme: `/[locale]/...`. Visiting `/` redirects to `/he` via the middleware.
- Config lives in `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, and `middleware.ts`.
- Each request merges two bundles per locale: `messages/{locale}.json` (UI copy) and
  `messages/{locale}/seo.json` (page metadata, exposed as the `seo` namespace).
- Always use the locale-aware helpers from `i18n/navigation.ts` (`Link`, `useRouter`, `usePathname`, …)
  for internal navigation, and prefer logical CSS utilities (`ms-*`, `pe-*`, `start-*`, …) so RTL/LTR
  both work.
- **Any new user-facing string must be added to both `en.json` and `he.json`.**

## Routes

All routes live under `app/[locale]/` and are statically generated for both locales.

| Route | Description |
| --- | --- |
| `/[locale]` | Home page (Hero → About → News → Academy → Calendar → Contact) |
| `/[locale]/about-us` | About the institution |
| `/[locale]/academy` | Academy index (filterable) |
| `/[locale]/academy/[category]` | Category-filtered academy index (`arts`, `science`, `sports`, `humanities`) |
| `/[locale]/academy/[category]/[activity]` | Single activity detail (gallery, faculty, timeline, related) |
| `/[locale]/admissions` | Admissions / registration |
| `/[locale]/resources` | Resources |
| `/[locale]/news` | News archive |
| `/[locale]/news/[slug]` | Single article (TOC, facts sidebar, related). Slugs are stable across locales |
| `/[locale]/facilities/rent` | Campus-rental page (gallery, amenities, enquiry) |
| `/[locale]/contact` | Contact (info, form, campus map) |
| `/[locale]/coming-soon` | "Under construction" page for routes not yet built |

Two not-found surfaces: `app/[locale]/not-found.tsx` (locale-aware, rendered inside the layout via the
`app/[locale]/[...rest]` catch-all) and a global `app/not-found.tsx` fallback.

## Key features

- **Site-wide search** — an in-memory, locale-aware index (`lib/search.ts`) over pages, news articles,
  academy activities, and calendar events, surfaced from the NavBar with an animated results dropdown
  that links straight to each result.
- **News** — typed articles in `lib/articles.ts` with block-based bodies (paragraph, pull-quote, image,
  **video**, heading, divider), rendered by `components/news/ArticleBody.tsx`. Cover images and inline
  media are served from Cloudinary.
- **Academy** — typed activities in `lib/activities.ts`. Per-slug Cloudinary media (cover + gallery) is
  injected centrally so it appears on the activity detail page, the `/academy` index, and the home
  showcase. Optional sections (faculty, milestones, testimonial) render only when present.
- **Calendar** — month / upcoming views on the home page, driven by event data in the message bundles.
- **Campus map** — `react-leaflet` map with the school coordinates and a "Directions" CTA; the
  "View location" / "Open in Maps" buttons across Home, Contact, and the rental page all point to the
  same Google Maps coordinates.
- **Footer** — links resolve to real routes; pages not yet built (Campus, FAQ, Parent Portal, Privacy,
  Accessibility, Sitemap) point to `/coming-soon`. The newsletter sign-up remains.

## Project structure

```
app/[locale]/            # routed pages (effective root layout owns <html lang dir>)
components/
  home/                  # Hero, About, News, Academy, Calendar, Contact sections + CampusMap
  layout/                # NavBar, Footer, CreditsStrip, NotFoundContent, ComingSoonContent
  academy/ news/ ...     # page-level components for each secondary route
  ui/                    # shadcn primitives
lib/
  activities.ts          # academy data + Cloudinary media map
  articles.ts            # news data
  search.ts              # search index
  utils.ts               # cn()
messages/                # en.json, he.json, and {locale}/seo.json
i18n/                    # routing, request, navigation config
```

## Media (Cloudinary)

Images and video are hosted on Cloudinary (cloud `dcpeggch3`) and referenced as absolute URLs through
`next/image`. The remote host is allow-listed in `next.config.ts` (`images.remotePatterns`). Folders are
organized by surface, e.g. `academy/<activity>`, `Campus Images/…`, and dated `dispatch-*` folders for
news media.

## Conventions

- Server components by default; mark a component `"use client"` only when it needs interactivity.
- Internal links use the i18n-aware `Link`; route changes use the i18n `useRouter`.
- shadcn components import from the `radix-ui` umbrella package.
- Keep comments for non-obvious "why", not to restate the code.

## Status

Prototype, fully rendering in both locales. Remaining work is mainly replacing placeholder content with
final institutional copy/media and integrating the planned 3D campus model into the Hero.

## Deployment

Hosted on **Vercel**. Pushing to `main` (the connected branch) triggers a production deployment.
The default branch is `main`.
