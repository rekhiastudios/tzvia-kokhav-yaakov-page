import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {getActivities, VALID_CATEGORY_SLUGS} from '@/lib/activities';
import type {CategorySlug} from '@/lib/activities';
import {AcademyIndexClient} from '@/components/academy/AcademyIndexClient';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export function generateStaticParams({
  params,
}: {
  params: {locale: string};
}) {
  void params;
  return VALID_CATEGORY_SLUGS.map((category) => ({category}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; category: string}>;
}): Promise<Metadata> {
  const {locale, category} = await params;
  if (!VALID_CATEGORY_SLUGS.includes(category as CategorySlug)) return {};
  const t = await getTranslations({locale, namespace: 'academyPage'});
  const cats = t.raw('categories') as Array<{slug: string; label: string}>;
  const cat = cats.find((c) => c.slug === category);
  return buildPageMetadata({
    locale,
    path: `/academy/${category}`,
    title: `${cat?.label ?? category.toUpperCase()} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('intro'),
  });
}

export default async function AcademyCategoryPage({
  params,
}: {
  params: Promise<{locale: string; category: string}>;
}) {
  const {locale, category} = await params;
  if (!VALID_CATEGORY_SLUGS.includes(category as CategorySlug)) notFound();
  setRequestLocale(locale);
  const activities = getActivities(locale);
  return (
    <AcademyIndexClient
      activities={activities}
      initialCategorySlug={category as CategorySlug}
    />
  );
}
