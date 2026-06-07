import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {getActivities} from '@/lib/activities';
import {AcademyIndexClient} from '@/components/academy/AcademyIndexClient';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'academyPage'});
  return buildPageMetadata({
    locale,
    path: '/academy',
    title: `${t('eyebrow')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('intro'),
  });
}

export default async function AcademyPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const activities = getActivities(locale);
  return <AcademyIndexClient activities={activities} />;
}
