import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getActivities, VALID_CATEGORY_SLUGS} from '@/lib/activities';
import {getArticles} from '@/lib/articles';
import {absoluteUrl, localizedPath} from '@/lib/seo';

const STATIC_PATHS = [
  '/',
  '/about-us',
  '/academy',
  '/admissions',
  '/resources',
  '/news',
  '/facilities/rent',
  '/contact',
];

function alternatesFor(path: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))]),
  );
}

function sitemapEntry(
  locale: string,
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified = new Date(),
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(locale, path)),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: alternatesFor(path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push(
        sitemapEntry(locale, path, path === '/' ? 1 : 0.8, path === '/news' ? 'weekly' : 'monthly'),
      );
    }

    for (const category of VALID_CATEGORY_SLUGS) {
      entries.push(sitemapEntry(locale, `/academy/${category}`, 0.7, 'monthly'));
    }

    for (const activity of getActivities(locale)) {
      if (!activity.slug) continue;
      entries.push(
        sitemapEntry(locale, `/academy/${activity.catSlug}/${activity.slug}`, 0.7, 'monthly'),
      );
    }

    for (const article of getArticles(locale)) {
      entries.push(
        sitemapEntry(
          locale,
          `/news/${article.slug}`,
          article.featured ? 0.8 : 0.6,
          'weekly',
          new Date(article.dateSort),
        ),
      );
    }
  }

  return entries;
}
