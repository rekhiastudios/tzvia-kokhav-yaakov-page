import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ResourcesPage} from '@/components/resources/ResourcesPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'resourcesPage'});
  return {
    title: `${t('breadcrumbResources')} — Ulpenat Tzvia`,
    description: t('heroDesc'),
  };
}

export default async function ResourcesRoute({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ResourcesPage />;
}
