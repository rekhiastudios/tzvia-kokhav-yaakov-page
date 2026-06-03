'use client';

import {useRouter} from 'next/navigation';
import {ArrowLeft, ArrowRight, Home} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

const QUICK_LINKS = [
  {key: 'about', href: '/about-us'},
  {key: 'academy', href: '/academy'},
  {key: 'admissions', href: '/admissions'},
  {key: 'resources', href: '/resources'},
  {key: 'contact', href: '/contact'},
] as const;

export function NotFoundContent() {
  const t = useTranslations('notFound');
  const nav = useTranslations('navbar');
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'he';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <section className="tz-404">
      <div className="tz-404-inner tz-page">
        <p className="tz-404-eyebrow">{'// '}{t('eyebrow')}</p>

        <div className="tz-404-code" aria-hidden="true">
          <span>404</span>
          <span className="tz-404-square" />
        </div>

        <h1 className="tz-404-title">
          <span className="tz-404-title-cream">{t('titleCream')}</span>{' '}
          <span className="tz-404-title-gold">{t('titleGold')}</span>
        </h1>

        <p className="tz-404-desc">{t('desc')}</p>

        <div className="tz-404-btns">
          <Link href="/" className="tz-404-btn-primary">
            <Home aria-hidden="true" strokeWidth={2.2} />
            {t('homeCta')}
          </Link>
          <button type="button" className="tz-404-btn-outline" onClick={() => router.back()}>
            <BackArrow aria-hidden="true" strokeWidth={2.2} />
            {t('backCta')}
          </button>
        </div>

        <div className="tz-404-rule" aria-hidden="true" />

        <p className="tz-404-try-label">{t('tryLabel')}</p>
        <nav className="tz-404-links" aria-label={t('tryLabel')}>
          {QUICK_LINKS.map(({key, href}) => (
            <Link key={href} href={href} className="tz-404-link">
              <span>{nav(key)}</span>
              <ArrowRight className="tz-404-link-arr" aria-hidden="true" strokeWidth={2} />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
