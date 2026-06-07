import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {RentPage} from '@/components/rent/RentPage';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'rentPage'});
  return buildPageMetadata({
    locale,
    path: '/facilities/rent',
    title: `${t('breadcrumbRent')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('heroDesc2'),
  });
}

export default async function RentTheCampusPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <RentPage />;
}
