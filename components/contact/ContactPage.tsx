'use client';

import {useState, useRef, useEffect, useCallback} from 'react';
import dynamic from 'next/dynamic';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Phone, Mail, MapPin, ExternalLink, MessageSquare, CalendarDays, HelpCircle, Newspaper, Shield} from 'lucide-react';

const CampusMap = dynamic(() => import('@/components/home/CampusMap'), {
  ssr: false,
  loading: () => <div className="tz-map-wrap tz-cnt-map-live tz-map-loading" />,
});

type ContactEntry = {
  badge: string; dept: string; name: string; desc: string;
  phone: string; phoneHref: string; phoneExt: string | null;
  email: string | null; emailHref: string | null;
  link: string | null; linkLabel: string | null;
  tourContact?: boolean;
};
type Topic  = {id: string; label: string};
type Hour   = {day: string; time: string};
type Action = {id: string; tag: string; label: string; href: string};

const ACTION_ICONS: Record<string, React.ElementType> = {
  whatsapp: MessageSquare,
  schedule: CalendarDays,
  faq: HelpCircle,
  newsletter: Newspaper,
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ContactPage() {
  const t = useTranslations('contactPage');

  const contacts   = t.raw('contacts')   as ContactEntry[];
  const topics     = t.raw('topics')     as Topic[];
  const hours      = t.raw('hours')      as Hour[];
  const actions    = t.raw('actions')    as Action[];
  const heroStats  = t.raw('heroStats')  as Array<{value: string; label: string}>;

  const [topic,   setTopic]   = useState(topics[0]?.id ?? 'general');
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [email,   setEmail]   = useState('');
  const [msg,     setMsg]     = useState('');
  const [agreed,  setAgreed]  = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // ── "Book a Tour" → scroll to Direct Contact + highlight the tour contact ──
  const directSecRef        = useRef<HTMLElement | null>(null);
  const tourCardRef         = useRef<HTMLDivElement | null>(null);
  const tourCardVisibleRef  = useRef(false);
  const pendingHighlightRef = useRef(false);
  const highlightTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tourHighlight, setTourHighlight] = useState(false);

  const triggerHighlight = useCallback(() => {
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    // Reset first so the animation can replay on repeated clicks.
    setTourHighlight(false);
    requestAnimationFrame(() => setTourHighlight(true));
    highlightTimerRef.current = setTimeout(() => setTourHighlight(false), 5400);
  }, []);

  useEffect(() => {
    const el = tourCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        tourCardVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && pendingHighlightRef.current) {
          pendingHighlightRef.current = false;
          triggerHighlight();
        }
      },
      {threshold: 0.6},
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    };
  }, [triggerHighlight]);

  const handleBookTour = useCallback(() => {
    if (tourCardVisibleRef.current) {
      triggerHighlight();
      return;
    }
    // Not in view yet — scroll there; the observer fires the glow once it lands.
    pendingHighlightRef.current = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    directSecRef.current?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [triggerHighlight]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim())            errs.name    = t('errRequired');
    if (!isValidEmail(email))    errs.email   = t('errEmail');
    if (msg.trim().length < 20)  errs.msg     = t('errMsgShort');
    if (!agreed)                 errs.privacy = t('errPrivacy');
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO: wire to email delivery / API when backend is ready
    setSuccess(true);
  }

  const mapsHref          = t('mapsHref');
  const directionsHref    = t('directionsHref');
  const privacyPolicyHref = t('privacyPolicyHref');

  return (
    <div className="tz-cnt-root">

      {/* ── 1. Hero ── */}
      <header className="tz-cnt-hero">
        <div aria-hidden="true" className="tz-cnt-hero-wm">{t('heroWatermark')}</div>
        <div className="tz-cnt-hero-inner tz-page">
          <nav className="tz-cnt-crumb" aria-label="breadcrumb">
            <Link href="/">{t('breadcrumbHome')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('breadcrumbContact')}</span>
          </nav>
          <p className="tz-cnt-eyebrow">{'// '}{t('heroEyebrow')}</p>
          <p className="tz-cnt-sub-eyebrow">{'// '}{t('heroSubEyebrow')}</p>
          <div className="tz-cnt-hero-content">
            <div className="tz-cnt-hero-lhs">
              <h1 className="tz-cnt-h1">
                <span className="tz-cnt-h1-line">{t('heroTitleLine1')}</span>
                {' '}
                <span className="tz-cnt-h1-gold">{t('heroTitleLine2')}</span>
              </h1>
              <p className="tz-cnt-hero-desc">{t('heroDesc')}</p>
            </div>
            <div className="tz-cnt-hero-stats-card">
              {heroStats.map((s, i) => (
                <div key={i} className="tz-cnt-hero-stat">
                  <span className="tz-cnt-hero-stat-val">{s.value}</span>
                  <span className="tz-cnt-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Direct Contact cards ── */}
      <section className="tz-cnt-direct-sec" id="direct" ref={directSecRef}>
        <div className="tz-page">
          <p className="tz-cnt-sec-eyebrow">{'// '}{t('directEyebrow')}</p>
          <h2 className="tz-cnt-direct-title">
            <span className="tz-cnt-direct-ghost">{t('directTitleGhost')}</span>
            {' '}
            <span className="tz-cnt-direct-gold">{t('directTitleGold')}</span>
          </h2>
          <div className="tz-cnt-cards-grid">
            {contacts.map((c, i) => (
              <div
                key={i}
                ref={c.tourContact ? tourCardRef : undefined}
                className={`tz-cnt-card${c.tourContact && tourHighlight ? ' tz-cnt-card-tour-glow' : ''}`}
              >
                <div className="tz-cnt-card-top">
                  <div className="tz-cnt-card-icon-wrap" aria-hidden="true">
                    <Phone size={16} />
                  </div>
                  <span className={`tz-cnt-card-badge${i === 0 ? ' tz-cnt-card-badge-filled' : ' tz-cnt-card-badge-outline'}`}>
                    {c.badge}
                  </span>
                </div>
                <p className="tz-cnt-card-dept">{c.dept}</p>
                <h3 className="tz-cnt-card-name">{c.name}</h3>
                <p className="tz-cnt-card-desc">{c.desc}</p>
                <div className="tz-cnt-card-contacts">
                  {c.phone && (
                    <a href={c.phoneHref} className="tz-cnt-card-phone">
                      <Phone size={12} aria-hidden="true" />
                      {c.phone}
                      {c.phoneExt && <em>{c.phoneExt}</em>}
                    </a>
                  )}
                  {c.email && c.emailHref && (
                    <a href={c.emailHref} className="tz-cnt-card-email">
                      <Mail size={12} aria-hidden="true" />
                      {c.email}
                    </a>
                  )}
                  {c.link && c.linkLabel && (
                    <Link href={c.link} className="tz-cnt-card-link">
                      {c.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Form + Map ── */}
      <section className="tz-cnt-form-sec" id="form">
        <div className="tz-cnt-form-grid tz-page">

          {/* Form panel */}
          <div className="tz-cnt-form-panel">
            <p className="tz-cnt-sec-eyebrow">{'// '}{t('formEyebrow')}</p>
            <div className="tz-cnt-form-accent" aria-hidden="true" />
            <p className="tz-cnt-form-intro">{t('formIntro')}</p>

            {success ? (
              <p className="tz-cnt-success-msg">{t('successMsg')}</p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="tz-cnt-form-body">

                {/* Topic picker */}
                <div>
                  <p className="tz-cnt-field-label">{t('formTopicLabel')}</p>
                  <div className="tz-cnt-topics">
                    {topics.map(tp => (
                      <button
                        key={tp.id}
                        type="button"
                        className={`tz-cnt-topic-pill${topic === tp.id ? ' tz-cnt-topic-active' : ''}`}
                        onClick={() => setTopic(tp.id)}
                      >
                        {tp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Phone */}
                <div className="tz-cnt-field-row">
                  <div className="tz-cnt-field-group">
                    <label className="tz-cnt-field-label" htmlFor="cnt-name">{t('fieldName')}</label>
                    <input
                      id="cnt-name"
                      className={`tz-cnt-input${errors.name ? ' tz-cnt-input-err' : ''}`}
                      type="text"
                      placeholder={t('fieldNamePlaceholder')}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      autoComplete="name"
                    />
                    {errors.name && <span className="tz-cnt-err">{errors.name}</span>}
                  </div>
                  <div className="tz-cnt-field-group">
                    <label className="tz-cnt-field-label" htmlFor="cnt-phone">{t('fieldPhone')}</label>
                    <input
                      id="cnt-phone"
                      className="tz-cnt-input"
                      type="tel"
                      placeholder={t('fieldPhonePlaceholder')}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="tz-cnt-field-group">
                  <label className="tz-cnt-field-label" htmlFor="cnt-email">{t('fieldEmail')}</label>
                  <input
                    id="cnt-email"
                    className={`tz-cnt-input${errors.email ? ' tz-cnt-input-err' : ''}`}
                    type="email"
                    placeholder={t('fieldEmailPlaceholder')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    dir="ltr"
                  />
                  {errors.email && <span className="tz-cnt-err">{errors.email}</span>}
                </div>

                {/* Message */}
                <div className="tz-cnt-field-group">
                  <label className="tz-cnt-field-label" htmlFor="cnt-msg">
                    {t('fieldMessage')}
                    <span className="tz-cnt-field-hint"> — {t('fieldMessageHint')}</span>
                  </label>
                  <textarea
                    id="cnt-msg"
                    className={`tz-cnt-textarea${errors.msg ? ' tz-cnt-input-err' : ''}`}
                    placeholder={t('fieldMessagePlaceholder')}
                    rows={5}
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                  />
                  {errors.msg && <span className="tz-cnt-err">{errors.msg}</span>}
                </div>

                {/* Privacy checkbox */}
                <div>
                  <label className="tz-cnt-privacy-label">
                    <input
                      type="checkbox"
                      className="tz-cnt-checkbox"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                    />
                    <span>
                      {t('privacyCheckPre')}{' '}
                      <a href={privacyPolicyHref} className="tz-cnt-privacy-link">{t('privacyPolicyLink')}</a>
                      {t('privacyCheckPost')}
                    </span>
                  </label>
                  {errors.privacy && <span className="tz-cnt-err">{errors.privacy}</span>}
                </div>

                {/* reCAPTCHA notice — integrate react-google-recaptcha when site key is available */}
                <p className="tz-cnt-recaptcha-note">
                  {t('recaptchaNote')}{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{t('recaptchaPrivacy')}</a>
                  {' · '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{t('recaptchaTerms')}</a>
                </p>

                <button type="submit" className="tz-cnt-submit-btn">
                  {t('submitBtn')}
                </button>
              </form>
            )}
          </div>

          {/* Map + Info panel */}
          <div className="tz-cnt-map-panel">

            {/* Dynamic campus map (same as Home) + "Open in Maps" overlay */}
            <div className="tz-cnt-map-live-wrap">
              <CampusMap showCard={false} className="tz-cnt-map-live" />
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="tz-cnt-open-maps-btn tz-cnt-open-maps-overlay"
              >
                <ExternalLink size={12} aria-hidden="true" />
                {t('openInMapsBtn')}
              </a>
            </div>

            {/* Address + buttons */}
            <div className="tz-cnt-visit-info">
              <p className="tz-cnt-map-eyebrow">{'// '}{t('visitEyebrow')}</p>
              <h2 className="tz-cnt-visit-title">{t('visitTitle')}</h2>
              <p className="tz-cnt-visit-addr">{t('visitLine1')}</p>
              <p className="tz-cnt-visit-addr">{t('visitLine2')}</p>
              <p className="tz-cnt-visit-addr tz-cnt-visit-addr-soft">{t('visitLine3')}</p>
              <div className="tz-cnt-map-btns">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tz-cnt-directions-btn"
                >
                  <MapPin size={13} aria-hidden="true" />
                  {t('directionsBtn')}
                </a>
                <button type="button" onClick={handleBookTour} className="tz-cnt-tour-btn">
                  {t('bookTourBtn')}
                </button>
              </div>
            </div>

            {/* Office hours */}
            <div className="tz-cnt-hours-panel">
              <p className="tz-cnt-hours-title">{t('hoursTitle')}</p>
              <div className="tz-cnt-hours-list">
                {hours.map((h, i) => (
                  <div key={i} className="tz-cnt-hours-row">
                    <span>{h.day}</span>
                    <span className="tz-cnt-hours-time">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fax */}
            <div className="tz-cnt-fax-row">
              <span className="tz-cnt-fax-label">{t('faxLabel')}</span>
              <span className="tz-cnt-fax-num">{t('faxNumber')}</span>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Quick Actions ── */}
      <section className="tz-cnt-actions-sec">
        <div className="tz-page">
          <p className="tz-cnt-sec-eyebrow">{'// '}{t('actionsEyebrow')}</p>
          <h2 className="tz-cnt-actions-title">{t('actionsTitle')}</h2>
          <div className="tz-cnt-actions-grid">
            {actions.map(action => {
              const Icon = ACTION_ICONS[action.id] ?? MessageSquare;
              return (
                <a key={action.id} href={action.href} className="tz-cnt-action-card">
                  <div className="tz-cnt-action-icon" aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <p className="tz-cnt-action-tag">{action.tag}</p>
                  <p className="tz-cnt-action-label">{action.label}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Privacy Banner ── */}
      {/* <div className="tz-cnt-privacy-bar">
        <div className="tz-page">
          <div className="tz-cnt-privacy-card">
            <div className="tz-cnt-privacy-icon" aria-hidden="true">
              <Shield size={22} />
            </div>
            <p className="tz-cnt-privacy-text">
              <span className="tz-cnt-privacy-bold">{t('privacyBannerBold')}</span>
              {t('privacyBannerText')}
              <a href={privacyPolicyHref} className="tz-cnt-privacy-link-bar">{t('privacyBannerLink')}</a>.
            </p>
          </div>
        </div>
      </div> */}

    </div>
  );
}
