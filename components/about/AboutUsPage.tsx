import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export function AboutUsPage() {
  const t = useTranslations('aboutPage');

  const stats = t.raw('stats') as Array<{value: string; label: string}>;
  const facts = t.raw('facts') as Array<{label: string; value: string}>;
  const philosophyBody = t.raw('philosophyBody') as string[];
  const leaders = t.raw('leaders') as Array<{initials: string; name: string; role: string; bio: string}>;
  const specs = t.raw('specs') as Array<{name: string; desc: string}>;
  const milestones = t.raw('milestones') as Array<{year: string; title: string; desc: string}>;

  return (
    <div className="tz-abt-root">

      {/* ── 1. Hero ── */}
      <header className="tz-abt-hero">
        <div aria-hidden="true" className="tz-abt-hero-wm">{t('heroWatermark')}</div>
        <div className="tz-abt-hero-inner tz-page">
          <nav className="tz-abt-crumb" aria-label="breadcrumb">
            <Link href="/">{t('breadcrumbHome')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('breadcrumbAbout')}</span>
          </nav>
          <p className="tz-abt-eyebrow">{'// '}{t('heroEyebrow')}</p>
          <h1 className="tz-abt-h1">
            <span className="tz-abt-h1-line1">{t('heroH1')}</span>
            <span className="tz-abt-h1-line2">{t('heroH2')}</span>
          </h1>
          <p className="tz-abt-hero-desc">{t('heroDesc')}</p>
        </div>
      </header>

      {/* ── 2. Numbers ── */}
      <section className="tz-abt-numbers">
        <div className="tz-abt-numbers-inner tz-page">
          <p className="tz-abt-sec-eyebrow">{t('numbersEyebrow')}</p>
          <div className="tz-abt-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="tz-abt-stat-card">
                <span className="tz-abt-stat-val">{stat.value}</span>
                <span className="tz-abt-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Fact Sheet ── */}
      <section className="tz-abt-factsheet-sec">
        <div className="tz-abt-factsheet-inner tz-page">
          <div className="tz-abt-factsheet-hd">
            <p className="tz-abt-sec-eyebrow-light">{t('factSheetEyebrow')}</p>
            <h2 className="tz-abt-sec-h2">{t('factSheetTitle')}</h2>
          </div>
          <dl className="tz-abt-facts-table">
            {facts.map((fact, i) => (
              <div key={i} className={`tz-abt-fact-row${i % 2 === 0 ? ' alt' : ''}`}>
                <dt className="tz-abt-fact-label">{fact.label}</dt>
                <dd className="tz-abt-fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 4. Philosophy ── */}
      <section className="tz-abt-philosophy">
        <div aria-hidden="true" className="tz-abt-philosophy-wm">{t('philosophyWatermark')}</div>
        <div className="tz-abt-philosophy-inner tz-page">
          <div className="tz-abt-philosophy-content">
            <div className="tz-abt-philosophy-lhs">
              <p className="tz-abt-sec-eyebrow">{'// '}{t('philosophyEyebrow')}</p>
              <h2 className="tz-abt-philosophy-title">
                <span className="tz-abt-philosophy-title-plain">{t('philosophyTitleLine1')}</span>
                {' '}
                <span className="tz-abt-philosophy-title-gold">{t('philosophyTitleLine2')}</span>
              </h2>
            </div>
            <div className="tz-abt-philosophy-rhs">
              {philosophyBody.map((para, i) => (
                <p key={i} className="tz-abt-p-light">{para}</p>
              ))}
              <blockquote className="tz-abt-quote">
                <p>&ldquo;{t('philosophyQuote')}&rdquo;</p>
                <cite>{'— '}{t('philosophyQuoteWho')}</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Leadership ── */}
      <section className="tz-abt-leadership-sec">
        <div className="tz-abt-leadership-inner tz-page">
          <p className="tz-abt-sec-eyebrow-light">{t('leadershipEyebrow')}</p>
          <h2 className="tz-abt-leadership-title">{t('leadershipTitle')}</h2>
          <div className="tz-abt-leader-grid">
            {leaders.map((leader, i) => (
              <div key={i} className="tz-abt-leader-card">
                <div className="tz-abt-leader-av" aria-hidden="true">{leader.initials}</div>
                <div className="tz-abt-leader-info">
                  <p className="tz-abt-leader-name">{leader.name}</p>
                  <p className="tz-abt-leader-role">{leader.role}</p>
                  <p className="tz-abt-leader-bio">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Specializations ── */}
      <section className="tz-abt-specs-sec">
        <div className="tz-abt-specs-inner tz-page">
          <p className="tz-abt-sec-eyebrow">{t('specsEyebrow')}</p>
          <h2 className="tz-abt-specs-title">{t('specsTitle')}</h2>
          <div className="tz-abt-specs-grid">
            {specs.map((spec, i) => (
              <div key={i} className="tz-abt-spec-card">
                <span className="tz-abt-spec-num">0{i + 1}</span>
                <h3 className="tz-abt-spec-name">{spec.name}</h3>
                <p className="tz-abt-spec-desc">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Timeline ── */}
      <section className="tz-abt-timeline-sec">
        <div className="tz-abt-timeline-inner tz-page">
          <p className="tz-abt-sec-eyebrow-light">{t('timelineEyebrow')}</p>
          <h2 className="tz-abt-sec-h2">{t('timelineTitle')}</h2>
          <div className="tz-abt-tl-grid">
            {milestones.map((m, i) => (
              <div key={i} className="tz-abt-tl-card">
                <span className="tz-abt-tl-year">{m.year}</span>
                <h3 className="tz-abt-tl-title">{m.title}</h3>
                <p className="tz-abt-tl-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ── */}
      <section className="tz-abt-cta-sec">
        <div className="tz-abt-cta-inner tz-page">
          <p className="tz-abt-sec-eyebrow">{t('ctaEyebrow')}</p>
          <h2 className="tz-abt-cta-title">
            {t('ctaTitle')}{' '}
            <span className="tz-abt-cta-year">{t('ctaYear')}</span>
          </h2>
          <div className="tz-abt-cta-btns">
            <a href="#" className="tz-abt-btn-primary">{t('ctaPrimary')}</a>
            <a href="#" className="tz-abt-btn-outline">{t('ctaSecondary')}</a>
          </div>
        </div>
      </section>

    </div>
  );
}
