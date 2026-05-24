import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreditsStrip() {
  const t = useTranslations('credits');

  return (
    <div className="tz-credits">
      {/* Video placeholder — absolute fill, added later */}
      <div className="tz-credits-video-slot" aria-hidden="true" />

      <div className="tz-credits-inner">
        {/* Developer */}
        <div className="tz-credits-group">
          <span className="tz-credits-label">{t('builtBy')}</span>
          <a
            href="https://rekhia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tz-credits-entity tz-credits-link"
          >
            <Image
              src="/RekhiaLogo.png"
              alt="Rekhia Studios"
              width={200}
              height={200}
              className="tz-credits-logo"
            />
            <span className="tz-credits-name">{t('rekhia')}</span>
          </a>
        </div>

        <div className="tz-credits-sep" aria-hidden="true" />

        {/* Clients */}
        <div className="tz-credits-group">
          <span className="tz-credits-label">{t('for')}</span>
          <div className="tz-credits-clients">
            <div className="tz-credits-entity">
              <Image
                src="/misrad-hajinuj-Logo.png"
                alt={t('govLabel')}
                width={200}
                height={200}
                className="tz-credits-logo"
              />
              <div className="tz-credits-info">
                <span className="tz-credits-name">{t('govLabel')}</span>
                <span className="tz-credits-sub">{t('govSub')}</span>
              </div>
            </div>
            <div className="tz-credits-entity">
              <Image
                src="/tzvialogo.PNG"
                alt={t('tzviaLabel')}
                width={200}
                height={200}
                className="tz-credits-logo"
              />
              <div className="tz-credits-info">
                <span className="tz-credits-name">{t('tzviaLabel')}</span>
                <span className="tz-credits-sub">{t('tziaSub')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
