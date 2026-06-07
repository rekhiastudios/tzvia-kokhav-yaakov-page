import type {Metadata} from 'next';
import {Inter, Secular_One, Bebas_Neue, Instrument_Sans} from 'next/font/google';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {NavBar} from '@/components/layout/NavBar';
import {CreditsStrip} from '@/components/layout/CreditsStrip';
import {Footer} from '@/components/layout/Footer';
import {cn} from '@/lib/utils';
import {buildPageMetadata, buildSchoolJsonLd} from '@/lib/seo';
import '../globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});
const secularOne = Secular_One({
  subsets: ['latin', 'hebrew'],
  weight: '400',
  variable: '--font-display',
});
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inst',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';
  const schoolJsonLd = JSON.stringify(buildSchoolJsonLd(locale)).replace(/</g, '\\u003c');

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        'font-sans',
        inter.variable,
        secularOne.variable,
        bebasNeue.variable,
        instrumentSans.variable,
      )}
    >
      <body className="antialiased" style={{background: '#fafaf6', color: '#000b21'}}>
        <script
          id="school-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: schoolJsonLd}}
        />
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <CreditsStrip />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
