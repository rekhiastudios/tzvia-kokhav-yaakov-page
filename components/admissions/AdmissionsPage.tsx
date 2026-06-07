import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {MessageSquare, FileText, ExternalLink} from 'lucide-react';

export function AdmissionsPage() {
  const t = useTranslations('admissionsPage');

  const quickFacts = t.raw('quickFacts') as Array<{label: string; date: string; time: string | null; dow: string}>;
  const steps = t.raw('steps') as Array<{num: string; badge: string; meta: string; title: string; desc: string; link: string | null; linkLabel: string | null}>;
  const openHouseDays = t.raw('openHouseDays') as Array<{badge: string; title: string; time: string; desc: string}>;
  const resources = t.raw('resources') as Array<{icon: string; title: string; desc: string; cta: string; href: string}>;

  return (
    <div className="tz-adm-root">

      {/* ── 1. Hero ── */}
      <header className="tz-adm-hero">
        <div aria-hidden="true" className="tz-adm-hero-wm">{t('heroWatermark')}</div>
        <div className="tz-adm-hero-inner tz-page">
          <nav className="tz-adm-crumb" aria-label="breadcrumb">
            <Link href="/">{t('breadcrumbHome')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('breadcrumbAdmissions')}</span>
          </nav>
          <p className="tz-adm-eyebrow">{'// '}{t('heroEyebrow')}</p>
          <p className="tz-adm-sub-eyebrow">{'// '}{t('heroSubEyebrow')}</p>
          <div className="tz-adm-hero-content">
            <div className="tz-adm-hero-lhs">
              <h1 className="tz-adm-h1">
                <span className="tz-adm-h1-line">{t('heroTitleLine1')}</span>
                <span className="tz-adm-h1-line">{t('heroTitleLine2')}</span>
                <span className="tz-adm-h1-line tz-adm-h1-gold">{t('heroTitleLine3')}</span>
              </h1>
              <p className="tz-adm-hero-desc">{t('heroDesc')}</p>
              {/* <div className="tz-adm-hero-btns">
                <a href="#steps" className="tz-adm-btn-primary">{t('heroCta1')} →</a>
                <a href="#key-dates" className="tz-adm-btn-outline">{t('heroCta2')}</a>
              </div> */}
            </div>

            <div className="tz-adm-quick-facts" id="key-dates">
              <p className="tz-adm-qf-title">{t('quickFactsTitle')}</p>
              <div className="tz-adm-qf-list">
                {quickFacts.map((fact, i) => (
                  <div key={i} className="tz-adm-qf-row">
                    <span className="tz-adm-qf-label">{fact.label}</span>
                    <span className="tz-adm-qf-date">
                      {fact.date}
                      {fact.time ? <span className="tz-adm-qf-time"> · {fact.time}</span> : null}
                    </span>
                    <span className="tz-adm-qf-dow">{fact.dow}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Steps ── */}
      <section className="tz-adm-steps-sec" id="steps">
        <div className="tz-adm-steps-inner tz-page">
          <p className="tz-adm-sec-eyebrow">{'// '}{t('stepsEyebrow')}</p>
          <h2 className="tz-adm-steps-title">
            {t('stepsTitle')}{' '}
            <span className="tz-adm-steps-title-brand">{t('stepsTitleBrand')}</span>
          </h2>
          <div className="tz-adm-steps-list">
            {steps.map((step, i) => (
              <div key={i} className="tz-adm-step-row">
                <span className="tz-adm-step-num">{step.num}</span>
                <div className="tz-adm-step-body">
                  <div className="tz-adm-step-meta-row">
                    <span className="tz-adm-step-badge">{step.badge}</span>
                    <span className="tz-adm-step-meta">{step.meta}</span>
                  </div>
                  <h3 className="tz-adm-step-title">{step.title}</h3>
                  <p className="tz-adm-step-desc">{step.desc}</p>
                  {step.link && (
                    <a
                      href={step.link}
                      className="tz-adm-step-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      {step.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Open House ── */}
      <section className="tz-adm-oh-sec">
        <div className="tz-adm-oh-inner tz-page">
          <p className="tz-adm-sec-eyebrow-dark">{'// '}{t('openHouseEyebrow')}</p>
          <h2 className="tz-adm-oh-title">
            {t('openHouseTitle')}{' '}
            <span className="tz-adm-oh-title-brand">{t('openHouseTitleBrand')}</span>
          </h2>
          <p className="tz-adm-oh-desc">{t('openHouseDesc')}</p>
          <div className="tz-adm-oh-cards">
            {openHouseDays.map((day, i) => (
              <div key={i} className="tz-adm-oh-card">
                <span className="tz-adm-oh-badge">{day.badge}</span>
                <h3 className="tz-adm-oh-card-title">{day.title}</h3>
                <p className="tz-adm-oh-time">{day.time}</p>
                <p className="tz-adm-oh-card-desc">{day.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Resources ── */}
      <section className="tz-adm-res-sec">
        <div className="tz-adm-res-inner tz-page">
          <div className="tz-adm-res-cards">
            {resources.map((res, i) => (
              <div key={i} className="tz-adm-res-card">
                <div className="tz-adm-res-icon" aria-hidden="true">
                  {res.icon === 'MessageSquare' ? <MessageSquare size={28} /> : <FileText size={28} />}
                </div>
                <h3 className="tz-adm-res-title">{res.title}</h3>
                <p className="tz-adm-res-desc">{res.desc}</p>
                <Link href={res.href} className="tz-adm-res-cta">{res.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="tz-adm-cta-sec">
        <div className="tz-adm-cta-inner tz-page">
          <p className="tz-adm-cta-eyebrow">{'// '}{t('ctaEyebrow')}</p>
          <h2 className="tz-adm-cta-title">{t('ctaTitle')}</h2>
          <p className="tz-adm-cta-who">{t('ctaWho')}</p>
          <div className="tz-adm-cta-btns">
            <Link href="/contact" className="tz-adm-btn-primary">{t('ctaPrimary')} →</Link>
            <Link href="/resources" className="tz-adm-btn-outline-light">{t('ctaSecondary')}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
