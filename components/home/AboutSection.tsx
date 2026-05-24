import {useTranslations} from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="tz-section tz-page">
      {/* Section header */}
      <div className="tz-sect-hd">
        <div className="tz-sect-num">{t('num')}</div>
        <h2 className="tz-sect-h2">
          {t('titlePre')} <span className="tz-gold">{t('titleHighlight')}</span>
          <span className="tz-gold">.</span>
        </h2>
      </div>

      <div className="tz-about-grid">
        {/* Left column — copy */}
        <div>
          <h3 className="tz-about-h3">
            {t('h3Pre')}
            <span className="tz-gold">{t('h3Gold')}</span>
            {t('h3Post')}
          </h3>
          <p className="tz-about-lede">{t('lede')}</p>
          <div className="tz-about-body">
            <p>{t('body1')}</p>
            <blockquote className="tz-pull-quote">
              {t('pullQuote')}
              <span className="tz-pull-who">— {t('pullWho')}</span>
            </blockquote>
            <p>{t('body2')}</p>
            <p>{t('body3')}</p>
          </div>

          {/* Stats row */}
          <div className="tz-stats-row">
            <div className="tz-stat">
              <div className="tz-stat-num">
                {t('stat1Num')}<span className="tz-stat-unit">{t('stat1Unit')}</span>
              </div>
              <div className="tz-stat-label">{t('stat1Label')}</div>
            </div>
            <div className="tz-stat">
              <div className="tz-stat-num">{t('stat2Num')}</div>
              <div className="tz-stat-label">{t('stat2Label')}</div>
            </div>
            <div className="tz-stat">
              <div className="tz-stat-num">
                {t('stat3Num')}<span className="tz-stat-unit">{t('stat3Unit')}</span>
              </div>
              <div className="tz-stat-label">{t('stat3Label')}</div>
            </div>
          </div>
        </div>

        {/* Right column — image placeholders */}
        <div className="tz-about-imgs">
          <div className="tz-ph tz-ph-big">
            <div className="tz-ph-inner">
              <div>{t('img1Label')}</div>
              <div className="tz-ph-sub">{t('img1Sub')}</div>
            </div>
          </div>
          <div className="tz-ph">
            <div className="tz-ph-inner">
              <div>{t('img2Label')}</div>
            </div>
          </div>
          <div className="tz-ph">
            <div className="tz-ph-inner">
              <div>{t('img3Label')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
