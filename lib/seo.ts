import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];

const FALLBACK_SITE_URL = 'http://localhost:3000';
const OG_IMAGE = '/tzvialogo.PNG';

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_NAME: Record<Locale, string> = {
  he: 'אולפנת צביה כוכב יעקב',
  en: 'Ulpenat Tzvia Kochav Yaakov',
};

const OG_LOCALES: Record<Locale, string> = {
  he: 'he_IL',
  en: 'en_US',
};

function normalizeSiteUrl(value?: string): string {
  const raw = value?.trim() || FALLBACK_SITE_URL;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

function normalizePath(path = '/'): string {
  if (!path || path === '/') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

export function localizedPath(locale: string, path = '/'): string {
  return `/${locale}${normalizePath(path)}`;
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString();
}

export function localizedAlternates(path = '/'): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedPath(locale, path)]),
  );

  return {
    ...languages,
    'x-default': localizedPath(routing.defaultLocale, path),
  };
}

interface PageMetadataInput {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  locale,
  path = '/',
  title,
  description,
  image = OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const safeLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
  const url = localizedPath(safeLocale, path);
  const alternateLocale = routing.locales
    .filter((candidate) => candidate !== safeLocale)
    .map((candidate) => OG_LOCALES[candidate]);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: {
      icon: '/tinytzvialogo.PNG',
      shortcut: '/tinytzvialogo.PNG',
      apple: '/tinytzvialogo.PNG',
    },
    alternates: {
      canonical: url,
      languages: localizedAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME[safeLocale],
      locale: OG_LOCALES[safeLocale],
      alternateLocale,
      type: 'website',
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export function buildSchoolJsonLd(locale: string) {
  const safeLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return {
    '@context': 'https://schema.org',
    '@type': ['School', 'EducationalOrganization'],
    name: SITE_NAME[safeLocale],
    alternateName:
      safeLocale === 'he'
        ? 'Ulpenat Tzvia Kochav Yaakov'
        : 'אולפנת צביה כוכב יעקב',
    url: absoluteUrl(localizedPath(safeLocale)),
    inLanguage: safeLocale,
    email: 'zviyaky@gmail.com',
    telephone: '+972-2-997-8049',
    faxNumber: '+972-153-2970-9610',
    address: {
      '@type': 'PostalAddress',
      addressLocality: safeLocale === 'he' ? 'כוכב יעקב' : 'Kochav Yaakov',
      addressRegion: safeLocale === 'he' ? 'מטה בנימין' : 'Mateh Binyamin',
      addressCountry: 'IL',
    },
    areaServed: [
      safeLocale === 'he' ? 'מטה בנימין' : 'Mateh Binyamin',
      safeLocale === 'he' ? 'ירושלים' : 'Jerusalem',
    ],
    educationalLevel: safeLocale === 'he' ? 'כיתות ט-י״ב' : 'Grades 9-12',
    sameAs: ['https://zviyaky.tik-tak.school/'],
  };
}
