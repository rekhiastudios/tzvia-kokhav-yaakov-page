import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ContactPage} from '@/components/contact/ContactPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contactPage'});
  return {
    title: `${t('breadcrumbContact')} — Ulpenat Tzvia`,
    description: t('heroDesc'),
  };
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
