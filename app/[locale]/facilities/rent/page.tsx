import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {RentPage} from '@/components/rent/RentPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'rentPage'});
  return {
    title: `${t('breadcrumbRent')} — Ulpenat Tzvia`,
    description: t('heroDesc2'),
  };
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
