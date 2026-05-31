import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Download, FileText, Search} from 'lucide-react';

export function ResourcesPage() {
  const t = useTranslations('resourcesPage');

  const heroStats  = t.raw('heroStats')  as Array<{value: string; label: string}>;
  const bookLists  = t.raw('bookLists')  as Array<{grade: string; title: string; meta: string; href: string | null}>;
  const forms      = t.raw('forms')      as Array<{category: string; type: string; title: string; subtitle: string; desc: string; href: string | null}>;
  const allListsHref = t.raw('allListsHref') as string | null;

  return (
    <div className="tz-res-root">

      {/* ── 1. Hero ── */}
      <header className="tz-res-hero">
        <div aria-hidden="true" className="tz-res-hero-wm">{t('heroWatermark')}</div>
        <div className="tz-res-hero-inner tz-page">
          <nav className="tz-res-crumb" aria-label="breadcrumb">
            <Link href="/">{t('breadcrumbHome')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('breadcrumbResources')}</span>
          </nav>
          <p className="tz-res-eyebrow">{'// '}{t('heroEyebrow')}</p>
          <p className="tz-res-sub-eyebrow">{'// '}{t('heroSubEyebrow')}</p>
          <div className="tz-res-hero-content">
            <div className="tz-res-hero-lhs">
              <h1 className="tz-res-h1">
                <span className="tz-res-h1-line">{t('heroTitleLine1')}</span>
                <span className="tz-res-h1-gold">{t('heroTitleLine2')}</span>
              </h1>
              <p className="tz-res-hero-desc">{t('heroDesc')}</p>
              <div className="tz-res-hero-tabs">
                <a href="#book-lists" className="tz-adm-btn-primary">{t('tabBookLists')}</a>
                <a href="#forms" className="tz-adm-btn-outline">{t('tabForms')}</a>
              </div>
            </div>
            <div className="tz-res-hero-stats-card">
              {heroStats.map((s, i) => (
                <div key={i} className="tz-res-hero-stat">
                  <span className="tz-res-hero-stat-val">{s.value}</span>
                  <span className="tz-res-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Book Lists ── */}
      <section className="tz-res-sec" id="book-lists">
        <div className="tz-res-sec-inner tz-page">
          <div className="tz-res-section-marker">
            <span className="tz-res-section-eyebrow">{'// '}{t('bookListsEyebrow')}</span>
            <span className="tz-res-section-line" aria-hidden="true" />
            <span className="tz-res-section-year">{t('bookListsYear')}</span>
          </div>
          <h2 className="tz-res-section-title">{t('bookListsTitle')}</h2>
          <div className="tz-res-section-desc-row">
            <p className="tz-res-section-desc">{t('bookListsDesc')}</p>
            <span className="tz-res-section-badge">{t('bookListsBadge')}</span>
          </div>
          <div className="tz-res-book-grid">
            {bookLists.map((item, i) => (
              <div key={i} className="tz-res-book-card">
                <div className="tz-res-book-card-top">
                  <div className="tz-res-grade-badge">
                    <span className="tz-res-grade-label">{t('gradeLabel')}</span>
                    <span className="tz-res-grade-val">{item.grade}</span>
                  </div>
                  <FileText size={15} className="tz-res-book-card-icon" aria-hidden="true" />
                </div>
                <h3 className="tz-res-book-title">{item.title}</h3>
                <p className="tz-res-book-meta">{item.meta}</p>
                {item.href ? (
                  <a href={item.href} className="tz-res-download-btn" download>
                    <Download size={12} aria-hidden="true" />{t('downloadBtn')}
                  </a>
                ) : (
                  <span className="tz-res-download-btn tz-res-download-btn-placeholder" aria-label="Not yet available">
                    <Download size={12} aria-hidden="true" />{t('downloadBtn')}
                  </span>
                )}
              </div>
            ))}
            {/* All-at-once card */}
            <div className="tz-res-book-card tz-res-all-card">
              <FileText size={28} className="tz-res-all-card-icon" aria-hidden="true" />
              <p className="tz-res-all-card-title">{t('allListsTitle')}</p>
              <p className="tz-res-all-card-meta">{t('allListsMeta')}</p>
              <a href={allListsHref ?? '#'} className="tz-res-all-card-link">
                {t('downloadAllBtn')} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Forms ── */}
      <section className="tz-res-sec tz-res-forms-sec" id="forms">
        <div className="tz-res-sec-inner tz-page">
          <div className="tz-res-section-marker">
            <span className="tz-res-section-eyebrow">{'// '}{t('formsEyebrow')}</span>
            <span className="tz-res-section-line" aria-hidden="true" />
            <span className="tz-res-evergreen-pill">{t('formsEvergreen')}</span>
          </div>
          <h2 className="tz-res-section-title">{t('formsTitle')}</h2>
          <div className="tz-res-section-desc-row">
            <p className="tz-res-section-desc">{t('formsDesc')}</p>
            <span className="tz-res-section-badge">{t('formsBadge')}</span>
          </div>
          <div className="tz-res-forms-list">
            {forms.map((form, i) => (
              <div key={i} className="tz-res-form-row">
                <div className="tz-res-form-icon-wrap" aria-hidden="true">
                  <FileText size={18} />
                </div>
                <div className="tz-res-form-body">
                  <div className="tz-res-form-tags">
                    <span className="tz-res-form-tag">{form.category}</span>
                    <span aria-hidden="true" className="tz-res-form-tag-sep">·</span>
                    <span className="tz-res-form-tag">{form.type}</span>
                  </div>
                  <h3 className="tz-res-form-title">{form.title}</h3>
                  <p className="tz-res-form-desc">
                    <span className="tz-res-form-subtitle">{form.subtitle}</span>
                    {' · '}
                    {form.desc}
                  </p>
                </div>
                {form.href ? (
                  <a href={form.href} className="tz-res-download-btn" download>
                    <Download size={12} aria-hidden="true" />{t('downloadBtn')}
                  </a>
                ) : (
                  <span className="tz-res-download-btn tz-res-download-btn-placeholder" aria-label="Not yet available">
                    <Download size={12} aria-hidden="true" />{t('downloadBtn')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section className="tz-res-cta-sec">
        <div className="tz-res-cta-inner tz-page">
          <div className="tz-res-cta-icon" aria-hidden="true">
            <Search size={36} />
          </div>
          <div className="tz-res-cta-body">
            <p className="tz-res-cta-eyebrow">{'// '}{t('ctaEyebrow')}</p>
            <h2 className="tz-res-cta-title">{t('ctaTitle')}</h2>
            <p className="tz-res-cta-desc">{t('ctaDesc')}</p>
          </div>
          <Link href="/contact" className="tz-res-cta-btn">{t('ctaBtn')} →</Link>
        </div>
      </section>

    </div>
  );
}
