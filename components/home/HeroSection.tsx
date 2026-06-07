import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="tz-hero" style={{paddingTop: 0, marginTop: 0}}>
      <div className="tz-hero-bg" />

      {/* Announcement strip */}
      <div className="tz-announce">
        <span>{t('admissionsOpen')} · {t('admissionsYear')}</span>
        <span style={{opacity: 0.4}}>·</span>
        <Link href="/admissions">
          {t('beginApplication')} <span className="arr">→</span>
        </Link>
      </div>

      {/* Bottom-start content stack — CITYPUNKS layout */}
      <div className="tz-hero-content">
        <div className="tz-hero-copy">
          <div className="tz-hero-kicker">{t('kicker')}</div>
          <h1 className="tz-hero-h1">
            <span>{t('h1Line1')}</span>
            <span>{t('h1Line2')}</span>
            <span className="tz-gold-line">{t('h1Line3')}</span>
          </h1>
          <p className="tz-hero-motto">{t('motto')}</p>
          <div className="tz-hero-cta">
            <Link href="/admissions" className="tz-btn-pill">
              {t('ctaPrimary')} <span>→</span>
            </Link>
            <button className="tz-btn-ghost" type="button">
              <span className="tz-play-circle">▶</span>
              {t('ctaSecondary')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
