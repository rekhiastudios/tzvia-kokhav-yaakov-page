import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ResourcesPage} from '@/components/resources/ResourcesPage';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'resourcesPage'});
  return buildPageMetadata({
    locale,
    path: '/resources',
    title: `${t('breadcrumbResources')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('heroDesc'),
  });
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
