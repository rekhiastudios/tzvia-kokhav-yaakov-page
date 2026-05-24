import {useTranslations} from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="tz-hero" style={{paddingTop: 0, marginTop: 0}}>
      <div className="tz-hero-bg" />

      {/* Announcement strip */}
      <div className="tz-announce">
        <span>{t('admissionsOpen')} · {t('admissionsYear')}</span>
        <span style={{opacity: 0.4}}>·</span>
        <a href="#contact">
          {t('beginApplication')} <span className="arr">→</span>
        </a>
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
            <a href="#contact" className="tz-btn-pill">
              {t('ctaPrimary')} <span>→</span>
            </a>
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
