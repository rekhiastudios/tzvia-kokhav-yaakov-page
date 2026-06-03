import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {ActivityDetail, ActivityMeta} from '@/lib/activities';

interface Props {
  locale: string;
  activity: ActivityDetail;
  related: ActivityMeta[];
}

export async function ActivityDetailPage({locale, activity: act, related}: Props) {
  const t = await getTranslations({locale, namespace: 'academyPage'});

  return (
    <div className="tz-act-page">
      {/* ── Hero — fills from top; breadcrumb lives inside ── */}
      <header className="tz-act-hero tz-dark">
        <div className="tz-act-hero-bg" aria-hidden="true" />
        <div className="tz-act-hero-inner tz-page">
          {/* Breadcrumb */}
          <nav className="tz-act-crumb" aria-label="breadcrumb">
            <div className="tz-act-crumb-start">
              <Link href="/academy">{'// '}{t('eyebrow')}</Link>
              <span aria-hidden="true">›</span>
              <Link href={`/academy/${act.catSlug}`}>{act.cat}</Link>
              <span aria-hidden="true">›</span>
              <span>{act.name.toUpperCase()}</span>
            </div>
            <div className="tz-act-crumb-end">
              <a href="#act-programme">{t('breadcrumbProgramme')}</a>
              <a href="#act-gallery">{t('breadcrumbCoverPhoto')}</a>
            </div>
          </nav>

          {/* Hero content */}
          <div className="tz-act-hero-content">
            <span className="tz-act-hero-cat">{act.cat}</span>
            <h1 className="tz-act-hero-h1">
              {act.name}<span className="tz-gold">.</span>
            </h1>
            <p className="tz-act-hero-lede">{act.lede}</p>
            {(act.grades || act.schedule || act.since) && (
              <div className="tz-act-hero-meta">
                {act.grades && (
                  <div className="tz-act-hero-stat">
                    <span className="tz-act-hero-stat-label">GRADES</span>
                    <span className="tz-act-hero-stat-val">{act.grades}</span>
                  </div>
                )}
                {act.schedule && (
                  <div className="tz-act-hero-stat">
                    <span className="tz-act-hero-stat-label">SCHEDULE</span>
                    <span className="tz-act-hero-stat-val">{act.schedule}</span>
                  </div>
                )}
                {act.since && (
                  <div className="tz-act-hero-stat">
                    <span className="tz-act-hero-stat-label">SINCE</span>
                    <span className="tz-act-hero-stat-val">{act.since}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── About + Sidebar ── */}
      <section id="act-programme" className="tz-act-body tz-page">
        <div className="tz-act-body-layout">
          {/* Left — about */}
          <div className="tz-act-about">
            <p className="tz-act-section-eyebrow">{'// '}{t('aboutLabel')}</p>
            <div className="tz-act-about-title-wrap" aria-hidden="true">
              <span className="tz-act-about-wm">{act.aboutWatermark}</span>
            </div>
            <h2 className="tz-act-about-gold">{act.aboutGoldTitle}</h2>
            <div className="tz-act-about-body">
              {act.aboutBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right — glance sidebar */}
          <aside className="tz-act-sb">
            <p className="tz-act-section-eyebrow">{'// '}{t('glanceLabel')}</p>
            <table className="tz-act-glance">
              <tbody>
                {act.glance.map((row) => (
                  <tr key={row.label} className="tz-act-glance-row">
                    <td className="tz-act-glance-label">{row.label}</td>
                    <td className="tz-act-glance-val">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href="#contact" className="tz-btn-pill tz-act-apply-btn">
              {t('applyBtn')} <span>→</span>
            </a>
            <button type="button" className="tz-act-brochure-btn">
              {t('brochureBtn')}
            </button>
          </aside>
        </div>
      </section>

      {/* ── Faculty ── */}
      {act.faculty && act.faculty.length > 0 && (
        <section className="tz-act-faculty tz-page">
          <p className="tz-act-section-eyebrow">{'// '}{t('facultyLabel')}</p>
          <div className="tz-act-faculty-hd">
            <span className="tz-act-faculty-wm" aria-hidden="true">
              {t('facultyMeetTitle').split(' ').slice(0, 2).join(' ')}
            </span>
            <h2 className="tz-act-section-h2">{t('facultyMeetTitle')}</h2>
          </div>
          <div className="tz-act-faculty-grid">
            {act.faculty.map((f) => (
              <div key={f.initials} className="tz-act-faculty-card">
                <div className="tz-act-faculty-av">{f.initials}</div>
                <div className="tz-act-faculty-name">{f.name}</div>
                <div className="tz-act-faculty-role">{f.role.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Timeline ── */}
      {act.timeline.length > 0 && (
        <section className="tz-act-timeline tz-page">
          <p className="tz-act-section-eyebrow">{'// '}{t('yearLabel')}</p>
          <div className="tz-act-timeline-hd">
            <span className="tz-act-tl-wm" aria-hidden="true">THE YEAR</span>
            <h2 className="tz-act-section-h2">{act.timelineTitle}</h2>
          </div>
          <div className="tz-act-tl-grid">
            {act.timeline.map((ev) => (
              <div key={ev.title} className="tz-act-tl-card">
                <span className="tz-act-tl-period">{ev.period}</span>
                <h3 className="tz-act-tl-title">{ev.title}</h3>
                <p className="tz-act-tl-desc">{ev.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      <section id="act-gallery" className="tz-act-gallery tz-page">
        <p className="tz-act-section-eyebrow">{'// '}{t('stageLabel')}</p>
        {act.gallery && act.gallery.length > 0 ? (
          <div className="tz-act-gallery-grid is-photos">
            {act.gallery.map((src, i) => (
              <div key={i} className="tz-act-gallery-item tz-act-gallery-photo">
                <Image
                  src={src}
                  alt={`${act.name} — ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="tz-act-gallery-grid">
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} className={`tz-act-gallery-item tz-ph${i === 0 ? ' tz-act-gallery-featured' : ''}`}>
                <div className="tz-ph-inner">
                  <span className="tz-ph-label">IMAGE</span>
                </div>
                {i === 5 && (
                  <div className="tz-act-gallery-more">+12 MORE</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Milestones ── */}
      {act.milestones && act.milestones.length > 0 && (
        <section className="tz-act-milestones tz-page">
          <p className="tz-act-section-eyebrow">{'// '}{t('milestonesLabel')}</p>
          <div className="tz-act-ms-grid">
            {act.milestones.map((m) => (
              <div key={m.label} className="tz-act-ms-card">
                <span className="tz-act-ms-num">{m.num}</span>
                <span className="tz-act-ms-label">{m.label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Testimonial ── */}
      {act.testimonial && (
        <section className="tz-act-testimonial tz-page">
          <div className="tz-act-test-inner">
            <p className="tz-act-test-quote">{act.testimonial.quote}</p>
            <div className="tz-act-test-attr">
              <div className="tz-act-test-av">{act.testimonial.initials}</div>
              <div>
                <div className="tz-act-test-name">{act.testimonial.name}</div>
                <div className="tz-act-test-sub">{act.testimonial.sub.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="tz-act-related tz-page">
          <div className="tz-act-related-hd">
            <span className="tz-act-related-eyebrow">{'// '}{t('exploreLabel')}</span>
            <Link href="/academy" className="tz-arc-read-link">
              {t('allActivities')} <span className="arr">→</span>
            </Link>
          </div>
          <div className="tz-act-related-grid">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/academy/${rel.catSlug}/${rel.slug}`}
                className="tz-acp-card"
              >
                <div className="tz-acp-card-bg">
                  <Image
                    src={rel.img}
                    alt={rel.name}
                    fill
                    className="tz-acp-card-img"
                    sizes="33vw"
                  />
                </div>
                <div className="tz-acp-card-body">
                  <span className="tz-acp-card-cat">{rel.cat}</span>
                  <h3 className="tz-acp-card-name">
                    {rel.name}<span className="tz-gold">.</span>
                  </h3>
                  <p className="tz-acp-card-desc">{rel.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
