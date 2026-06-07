import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {getArticles} from '@/lib/articles';
import {NewsArchiveClient} from '@/components/news/NewsArchiveClient';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'newsArchive'});
  return buildPageMetadata({
    locale,
    path: '/news',
    title: `${t('eyebrow')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('desc'),
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const articles = getArticles(locale);

  return <NewsArchiveClient articles={articles} />;
}
