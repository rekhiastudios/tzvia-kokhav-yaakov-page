import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {AdmissionsPage} from '@/components/admissions/AdmissionsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'admissionsPage'});
  return {
    title: `${t('breadcrumbAdmissions')} — Ulpenat Tzvia`,
    description: t('heroDesc'),
  };
}

export default async function AdmissionsRoute({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <AdmissionsPage />;
}
