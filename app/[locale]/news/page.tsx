import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {getArticles} from '@/lib/articles';
import {NewsArchiveClient} from '@/components/news/NewsArchiveClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'newsArchive'});
  return {
    title: `${t('eyebrow')} — Ulpenat Tzvia`,
    description: t('desc'),
  };
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
