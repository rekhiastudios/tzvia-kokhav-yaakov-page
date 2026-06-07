import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ContactPage} from '@/components/contact/ContactPage';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contactPage'});
  return buildPageMetadata({
    locale,
    path: '/contact',
    title: `${t('breadcrumbContact')} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: t('heroDesc'),
  });
}

export default async function ContactRoute({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ContactPage />;
}
