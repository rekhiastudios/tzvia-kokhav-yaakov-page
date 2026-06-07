import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ComingSoonContent} from '@/components/layout/ComingSoonContent';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'comingSoon'});
  return buildPageMetadata({
    locale,
    path: '/coming-soon',
    title: `${t('titleGold')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('desc'),
    noIndex: true,
  });
}

export default async function ComingSoonRoute({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ComingSoonContent />;
}
