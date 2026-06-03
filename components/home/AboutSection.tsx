import {useTranslations} from 'next-intl';
import Image from 'next/image';

// Campus imagery (Cloudinary). "main-campus" lives in the Campus Images folder;
// the other two are reused from the academy activity galleries (country + theatre).
const CLD = 'https://res.cloudinary.com/dcpeggch3/image/upload';
const ABOUT_IMG_MAIN = `${CLD}/v1780474430/%D7%90%D7%A8%D7%A5-1-1_bvzsnj.png`;
const ABOUT_IMG_LAND = `${CLD}/v1780433153/%D7%90%D7%A8%D7%A5-2-1-1152x1536_h1599j.jpg`;
const ABOUT_IMG_THEATRE = `${CLD}/v1780433179/%D7%AA%D7%99%D7%90%D7%98%D7%A8%D7%95%D7%9F-1-1-1536x1152_mj72gy.jpg`;

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

        {/* Right column — campus imagery */}
        <div className="tz-about-imgs">
          <div className="tz-ph tz-ph-big">
            <Image
              src={ABOUT_IMG_MAIN}
              alt={t('img1Label')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="tz-ph">
            <Image
              src={ABOUT_IMG_LAND}
              alt={t('img2Label')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="tz-ph">
            <Image
              src={ABOUT_IMG_THEATRE}
              alt={t('img3Label')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
