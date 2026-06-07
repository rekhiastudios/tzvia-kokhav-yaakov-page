import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {AboutUsPage} from '@/components/about/AboutUsPage';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'aboutPage'});
  return buildPageMetadata({
    locale,
    path: '/about-us',
    title: `${t('breadcrumbAbout')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('heroDesc'),
  });
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
