import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Home, Users, BookOpen, Heart, Star, Phone, User, ArrowUpRight, MapPin} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home size={20} aria-hidden="true" />,
  Users: <Users size={20} aria-hidden="true" />,
  BookOpen: <BookOpen size={20} aria-hidden="true" />,
  Heart: <Heart size={20} aria-hidden="true" />,
  Star: <Star size={20} aria-hidden="true" />,
};

export function RentPage() {
  const t = useTranslations('rentPage');

  const heroStats  = t.raw('heroStats')   as Array<{value: string; label: string}>;
  const events     = t.raw('events')      as Array<{icon: string; title: string}>;
  const galleryItems = t.raw('galleryItems') as Array<{label: string; featured: boolean; isMore: boolean}>;
  const amenities  = t.raw('amenities')   as string[];
  const contact    = t.raw('contact')     as {name: string; phone: string; phoneHref: string; whatsappHref: string};

  const half = Math.ceil(amenities.length / 2);
  const amenitiesLeft  = amenities.slice(0, half);
  const amenitiesRight = amenities.slice(half);

  return (
    <div className="tz-rent-root">

      {/* ── 1. Hero ── */}
      <header className="tz-rent-hero">
        <div aria-hidden="true" className="tz-rent-hero-wm">{t('heroWatermark')}</div>
        <div className="tz-rent-hero-inner tz-page">
          <nav className="tz-rent-crumb" aria-label="breadcrumb">
            <Link href="/facilities">{t('breadcrumbFacilities')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('breadcrumbRent')}</span>
          </nav>
          <p className="tz-rent-eyebrow">{'// '}{t('heroEyebrow')}</p>
          <p className="tz-rent-sub-eyebrow">{'// '}{t('heroSubEyebrow')}</p>
          <div className="tz-rent-hero-content">
            <div className="tz-rent-hero-lhs">
              <h1 className="tz-rent-h1">
                <span className="">{t('heroTitleLine1')}</span>
                <span className="">{t('heroTitleLine2')}</span>
                <span className="tz-rent-h1-gold">{t('heroTitleLine3')}</span>
              </h1>
              <p className="tz-rent-hero-desc">{t('heroDesc1')}</p>
              <p className="tz-rent-hero-desc">{t('heroDesc2')}</p>
              <p className="tz-rent-hero-desc">
                {t('heroDesc3Pre')}
                <strong className="tz-rent-hero-desc-bold">{t('heroDesc3Bold')}</strong>
                {t('heroDesc3Post')}
              </p>
              <div className="tz-rent-hero-btns">
                <a href="#enquiry" className="tz-adm-btn-primary">{t('heroCta1')} →</a>
                <a href="#gallery" className="tz-adm-btn-outline">{t('heroCta2')}</a>
              </div>
            </div>
            <div className="tz-rent-hero-stats-card">
              {heroStats.map((stat, i) => (
                <div key={i} className="tz-rent-stat-card">
                  <span className="tz-rent-stat-val">{stat.value}</span>
                  <span className="tz-rent-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Event Types ── */}
      <section className="tz-rent-events-sec">
        <div className="tz-rent-events-inner tz-page">
          <p className="tz-rent-sec-eyebrow">{'// '}{t('eventsEyebrow')}</p>
          <h2 className="tz-rent-events-title">
            <span className="tz-rent-title-muted">{t('eventsTitleLine1')}</span>{' '}
            <span className="tz-rent-title-gold">{t('eventsTitleBrand')}</span>
          </h2>
          <div className="tz-rent-events-cards">
            {events.map((ev, i) => (
              <div key={i} className="tz-rent-event-card">
                <span className="tz-rent-event-icon">{ICON_MAP[ev.icon]}</span>
                <h3 className="tz-rent-event-label">{ev.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Gallery ── */}
      <section className="tz-rent-gallery-sec" id="gallery">
        <div className="tz-rent-gallery-inner tz-page">
          <p className="tz-rent-sec-eyebrow">{'// '}{t('galleryEyebrow')}</p>
          <h2 className="tz-rent-gallery-title">
            <span className="tz-rent-title-muted">{t('galleryTitleLine1')}</span>{' '}
            <span className="tz-rent-title-gold">{t('galleryTitleBrand')}</span>
          </h2>
          <div className="tz-rent-gallery-grid">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={[
                  'tz-rent-gallery-item',
                  i === 0 ? 'tz-rent-gallery-main' : '',
                  item.isMore ? 'tz-rent-gallery-item-more' : '',
                ].filter(Boolean).join(' ')}
              >
                {item.featured && (
                  <span className="tz-rent-gallery-badge">{t('featuredBadge')}</span>
                )}
                <span className="tz-rent-gallery-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Amenities ── */}
      <section className="tz-rent-amenities-sec">
        <div className="tz-rent-amenities-inner tz-page">
          <p className="tz-rent-sec-eyebrow">{'// '}{t('amenitiesEyebrow')}</p>
          <h2 className="tz-rent-amenities-title">
            <span className="tz-rent-title-muted">{t('amenitiesTitleLine1')}</span>{' '}
            <span className="tz-rent-title-gold">{t('amenitiesTitleBrand')}</span>
          </h2>
          <div className="tz-rent-amenities-box">
            <ul className="tz-rent-amenities-list">
              {amenitiesLeft.map((item, i) => (
                <li key={i} className="tz-rent-amenity-item">{item}</li>
              ))}
            </ul>
            <ul className="tz-rent-amenities-list">
              {amenitiesRight.map((item, i) => (
                <li key={i} className="tz-rent-amenity-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. CTA / Contact ── */}
      <section className="tz-rent-cta-sec" id="enquiry">
        <div className="tz-rent-cta-inner tz-page">
          <div className="tz-rent-cta-lhs">
            <p className="tz-rent-cta-eyebrow">{'// '}{t('ctaEyebrow')}</p>
            <h2 className="tz-rent-cta-title">{t('ctaTitle')}</h2>
            <p className="tz-rent-cta-desc">{t('ctaDesc')}</p>
            <div className="tz-rent-cta-contacts">
              <div className="tz-rent-cta-contact-card">
                <User size={14} aria-hidden="true" className="tz-rent-cta-card-icon" />
                <div>
                  <span className="tz-rent-cta-card-label">{t('ctaContactLabel')}</span>
                  <span className="tz-rent-cta-card-val">{contact.name}</span>
                </div>
              </div>
              <a href={contact.phoneHref} className="tz-rent-cta-contact-card">
                <Phone size={14} aria-hidden="true" className="tz-rent-cta-card-icon" />
                <div>
                  <span className="tz-rent-cta-card-label">{t('ctaPhoneLabel')}</span>
                  <span className="tz-rent-cta-card-val">{contact.phone}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="tz-rent-cta-rhs">
            <a href={contact.whatsappHref} className="tz-rent-cta-btn-pill" target="_blank" rel="noopener noreferrer">
              {t('ctaBtn1')}
            </a>
            <a href={contact.phoneHref} className="tz-rent-cta-btn-dark">
              <span>{t('ctaBtn2')}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="https://maps.google.com" className="tz-rent-cta-btn-dark" target="_blank" rel="noopener noreferrer">
              <span>{t('ctaBtn3')}</span>
              <MapPin size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
