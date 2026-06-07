import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {
  getActivities,
  getActivity,
  getRelatedActivities,
  VALID_CATEGORY_SLUGS,
} from '@/lib/activities';
import type {CategorySlug} from '@/lib/activities';
import {ActivityDetailPage} from '@/components/academy/ActivityDetail';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export function generateStaticParams({
  params,
}: {
  params: {locale: string; category: string};
}) {
  const {locale, category} = params;
  if (!VALID_CATEGORY_SLUGS.includes(category as CategorySlug)) return [];
  return getActivities(locale)
    .filter((a) => a.catSlug === category)
    .map((a) => ({activity: a.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; category: string; activity: string}>;
}): Promise<Metadata> {
  const {locale, category, activity} = await params;
  const act = getActivity(locale, category, activity);
  if (!act) return {};
  return buildPageMetadata({
    locale,
    path: `/academy/${category}/${activity}`,
    title: `${act.name} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: act.lede,
  });
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{locale: string; category: string; activity: string}>;
}) {
  const {locale, category, activity} = await params;
  setRequestLocale(locale);

  const act = getActivity(locale, category, activity);
  if (!act) notFound();

  const related = getRelatedActivities(locale, act.relatedSlugs).slice(0, 3);

  return <ActivityDetailPage locale={locale} activity={act} related={related} />;
}
