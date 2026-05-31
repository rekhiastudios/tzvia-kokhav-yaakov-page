import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {AboutUsPage} from '@/components/about/AboutUsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'aboutPage'});
  return {
    title: `${t('breadcrumbAbout')} — Ulpenat Tzvia`,
    description: t('heroDesc'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <AboutUsPage />;
}
