// ─────────────────────────────────────────────────────────────────────────────
// In-memory, locale-aware search index across every navigable surface of the
// site: static pages, news articles, academy activities, and calendar events.
// Built client-side from the i18n message bundle + the typed lib/ data stores.
// No backend — this is a pure function over data already shipped to the client.
// ─────────────────────────────────────────────────────────────────────────────

import {getArticles} from './articles';
import {getActivities} from './activities';

export type SearchType = 'page' | 'article' | 'activity' | 'event';

export interface SearchEntry {
  type: SearchType;
  title: string;
  /** Secondary line (date, category, when…). */
  subtitle?: string;
  /** Locale-relative path consumed by the i18n-aware <Link>. */
  href: string;
  /** Lowercased haystack used for matching. */
  keywords: string;
}

/** Shape of the slices of the message bundle this index reads. */
interface SearchMessages {
  navbar?: Record<string, string>;
  calendar?: {events?: Array<{title: string; when?: string; desc?: string}>};
}

/** Static pages, keyed by their navbar label. */
const PAGE_ROUTES: Array<{key: string; href: string}> = [
  {key: 'home', href: '/'},
  {key: 'about', href: '/about-us'},
  {key: 'academy', href: '/academy'},
  {key: 'admissions', href: '/admissions'},
  {key: 'resources', href: '/resources'},
  {key: 'news', href: '/news'},
  {key: 'rent', href: '/facilities/rent'},
  {key: 'contact', href: '/contact'},
];

function norm(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(' ').toLowerCase();
}

/** Builds the full search index for a locale from the message bundle + data stores. */
export function buildSearchIndex(locale: string, messages: SearchMessages): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Static pages
  const navbar = messages.navbar ?? {};
  for (const {key, href} of PAGE_ROUTES) {
    const title = navbar[key];
    if (!title) continue;
    entries.push({type: 'page', title, href, keywords: norm(title, key)});
  }

  // News articles
  for (const a of getArticles(locale)) {
    entries.push({
      type: 'article',
      title: a.title,
      subtitle: a.date,
      href: `/news/${a.slug}`,
      keywords: norm(a.title, a.lede, a.tag, a.tags?.join(' ')),
    });
  }

  // Academy activities (skip category-only shells with no own slug)
  for (const act of getActivities(locale)) {
    if (!act.slug) continue;
    entries.push({
      type: 'activity',
      title: act.name,
      subtitle: act.cat,
      href: `/academy/${act.catSlug}/${act.slug}`,
      keywords: norm(act.name, act.cat, act.desc),
    });
  }

  // Calendar events (home page anchor)
  for (const ev of messages.calendar?.events ?? []) {
    entries.push({
      type: 'event',
      title: ev.title,
      subtitle: ev.when,
      href: '/#calendar',
      keywords: norm(ev.title, ev.desc, ev.when),
    });
  }

  return entries;
}

/** Relative ordering used as a tiebreaker so pages surface before deep content. */
const TYPE_ORDER: Record<SearchType, number> = {page: 0, activity: 1, article: 2, event: 3};

/**
 * Filters + ranks the index against a free-text query. All whitespace-separated
 * tokens must appear (AND). Title matches rank above keyword-only matches.
 */
export function searchEntries(index: SearchEntry[], query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);

  const scored: Array<{entry: SearchEntry; score: number}> = [];
  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const hay = `${title} ${entry.keywords}`;
    if (!tokens.every((tok) => hay.includes(tok))) continue;

    let score: number;
    if (title.startsWith(q)) score = 0;
    else if (title.includes(q)) score = 1;
    else score = 2;
    scored.push({entry, score});
  }

  scored.sort(
    (a, b) =>
      a.score - b.score ||
      TYPE_ORDER[a.entry.type] - TYPE_ORDER[b.entry.type] ||
      a.entry.title.localeCompare(b.entry.title),
  );

  return scored.slice(0, limit).map((s) => s.entry);
}
