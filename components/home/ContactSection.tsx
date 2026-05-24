'use client';

import dynamic from 'next/dynamic';
import {useTranslations} from 'next-intl';

const CampusMap = dynamic(() => import('./CampusMap'), {
  ssr: false,
  loading: () => <div className="tz-map-wrap tz-map-loading" />,
});

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="tz-section tz-page" style={{paddingBottom: 120}}>
      {/* Section header */}
      <div className="tz-sect-hd">
        <div className="tz-sect-num">{t('num')}</div>
        <h2 className="tz-sect-h2">
          {t('titlePre')} <span className="tz-gold">{t('titleHighlight')}</span>
          <span className="tz-gold">.</span>
        </h2>
      </div>

      <div className="tz-contact-grid">
        {/* Left column — info */}
        <div className="tz-contact-side">
          <h3 className="tz-contact-h3">{t('h3')}</h3>
          <p className="tz-contact-lede">{t('lede')}</p>

          <div className="tz-contact-info">
            <div className="tz-info-row">
              <div className="tz-info-label">{t('addressLabel')}</div>
              <div className="tz-info-val">{t('addressValue')}</div>
            </div>
            <div className="tz-info-row">
              <div className="tz-info-label">{t('officeLabel')}</div>
              <div className="tz-info-val">{t('officeValue')}</div>
            </div>
            <div className="tz-info-row">
              <div className="tz-info-label">{t('admissionsLabel')}</div>
              <div className="tz-info-val">{t('admissionsValue')}</div>
            </div>
            <div className="tz-info-row">
              <div className="tz-info-label">{t('hoursLabel')}</div>
              <div className="tz-info-val">{t('hoursValue')}</div>
            </div>
          </div>

          <CampusMap />
        </div>

        {/* Right column — form */}
        <div className="tz-form">
          <div className="tz-form-head">
            <span>
              <span className="tz-form-step">{t('formStep')}</span>
              {t('formStepDesc')}
            </span>
            <span>{t('formEncrypted')}</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="tz-form-row">
              <div className="tz-field">
                <label htmlFor="fname">{t('fieldFirstName')}</label>
                <input
                  id="fname"
                  className="tz-input"
                  placeholder={t('placeholderFirstName')}
                  autoComplete="given-name"
                />
              </div>
              <div className="tz-field">
                <label htmlFor="lname">{t('fieldLastName')}</label>
                <input
                  id="lname"
                  className="tz-input"
                  placeholder={t('placeholderLastName')}
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div className="tz-form-row">
              <div className="tz-field">
                <label htmlFor="email">{t('fieldEmail')}</label>
                <input
                  id="email"
                  type="email"
                  className="tz-input"
                  placeholder={t('placeholderEmail')}
                  autoComplete="email"
                />
              </div>
              <div className="tz-field">
                <label htmlFor="phone">{t('fieldPhone')}</label>
                <input
                  id="phone"
                  type="tel"
                  className="tz-input"
                  placeholder={t('placeholderPhone')}
                  autoComplete="tel"
                />
              </div>
            </div>
            <div className="tz-field">
              <label htmlFor="subject">{t('fieldSubject')}</label>
              <input
                id="subject"
                className="tz-input"
                placeholder={t('placeholderSubject')}
              />
            </div>
            <div className="tz-field">
              <label htmlFor="message">{t('fieldMessage')}</label>
              <textarea
                id="message"
                className="tz-textarea"
                placeholder={t('placeholderMessage')}
              />
            </div>
            <div className="tz-form-footer">
              <span className="tz-form-note">
                {t('formNotePrefix')} <strong>{t('formNoteHighlight')}</strong>{' '}
                {t('formNoteSuffix')}
              </span>
              <button type="submit" className="tz-submit-btn">
                {t('submitBtn')} <span className='arr'>→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
